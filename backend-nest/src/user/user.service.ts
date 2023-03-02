import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserRepository } from "./repository/user.repository";
import { passComparer, passHasher } from "../auth/helper";
import { ChangePasswordDto, ProfileUpdateDto } from "./dto";
import { ActionTokenRepository } from "../auth/repository";
import { UserDocument } from "./model/user.model";
import { NoteRepository } from "../note/repository/note.repository";
import { PlanRepository } from "../plan/repository/plan.repository";
import { MomentRepository } from "../moment/repository/moment.repository";
import { exists, unlinker } from "../common/helper";
import { ConfigService } from "@nestjs/config";
import { IEnvironmentVariables } from "../config/env-variables.interface";
import { CHANGE_EMAIL, EMAIL_CONFIRMATION_TOKEN_TYPE, staticPath } from "../common/constants";
import { IUpdateProfileResponse } from "./interface/update-profile-response.interface";
import { IUserInfoResponse } from "./interface/user-info-response.interface";
import { EmailService } from "../common/email.service";
import { TokenService } from "../common/token.service";
import path from "node:path";

@Injectable()
export class UserService {

   constructor(
      private userRepository: UserRepository,
      private actionTokenRepository: ActionTokenRepository,
      private tokenService: TokenService,
      private emailService: EmailService,
      private noteRepository: NoteRepository,
      private planRepository: PlanRepository,
      private momentRepository: MomentRepository,
      private configService: ConfigService<IEnvironmentVariables>,
   ) {
   }

   async getUserInfo(userId: UserDocument["id"]): Promise<IUserInfoResponse> {
      // Find user in DB and count holding
      const user = await this.userRepository.findById(userId);

      const [ notesCount, plansCount, momentsCount ] = await Promise.all([
         this.noteRepository.count(userId),
         this.planRepository.count(userId),
         this.momentRepository.count(userId),
      ]);

      // Return presented date to client
      return {
         name: user.name,
         surname: user.surname,
         username: user.username,
         avatar: user.avatar,
         momentsCount,
         plansCount,
         notesCount,
      };

   }

   async changeEmailRequest(userId: UserDocument["id"], email: string): Promise<void> {
      // Generate link
      const confirmationToken = this.tokenService.generate({ userId, email }, this.configService.get("changeEmail"));
      const confirmationLink = `${ process.env.CLIENT_URL }/email_confirmation/new?token=${ confirmationToken }`;

      // Find user and save action token to DB
      const [ user ] = await Promise.all([
         this.userRepository.findById(userId),
         this.actionTokenRepository.create({
            token: confirmationToken,
            tokenType: EMAIL_CONFIRMATION_TOKEN_TYPE,
            ownerId: userId,
         }),
      ]);

      // Send email
      await this.emailService.send(email, CHANGE_EMAIL, { confirmationLink, username: user.username });
   }

   async changeEmail(token: string): Promise<void> {
      // Decoding token
      const {
         userId,
         email,
      } = this.tokenService.tokenVerify(token, this.configService.get("changeEmail")) as { userId: string, email: string };
      if (!userId && !email) throw new HttpException("Invalid or expired token", HttpStatus.UNAUTHORIZED);

      // Delete action token
      const actionToken = await this.actionTokenRepository.findOneAndDelete({ token });
      if (!actionToken) throw new HttpException("Invalid or expired token", HttpStatus.UNAUTHORIZED);

      // Update email
      await this.userRepository.findByIdAndUpdate(userId, { email: email });
   }

   async changePassword(userId: UserDocument["id"], dto: ChangePasswordDto): Promise<void> {
      // Find user in DB
      const user = await this.userRepository.findOne({ _id: userId });

      // Check is current password correct
      const isCurrentPassCorrect = await passComparer(dto.currentPassword, user.password);
      if (!isCurrentPassCorrect) throw new HttpException("Current password is not valid", HttpStatus.BAD_REQUEST);

      // Check is new password does not same with old
      const isNewPasswordSame = await passComparer(dto.newPassword, user.password);
      if (isNewPasswordSame) throw new HttpException("Password is already in use", HttpStatus.BAD_REQUEST);

      // Hash password
      user.password = await passHasher(dto.newPassword);

      // Update user
      await user.save();
   }

   async profileUpdate(userId: UserDocument["id"], dto: ProfileUpdateDto): Promise<IUpdateProfileResponse> {
      // Update user
      const updatedUser = await this.userRepository.findByIdAndUpdate(userId, dto);

      return {
         username: updatedUser.username,
         name: updatedUser.name,
         surname: updatedUser.surname,
      };
   }

   async uploadAvatar(fileName: string, userId: string): Promise<void> {
      // Delete prev image from hard drive if exists
      const { avatar } = await this.userRepository.findById(userId);
      const imagePath = path.join(staticPath, (avatar ? avatar : "nothing"));
      const isImageExists = await exists(imagePath);

      if (isImageExists) await unlinker(imagePath);

      // Save avatar to DB
      await this.userRepository.findByIdAndUpdate(userId, { avatar: fileName });
   }

   async deleteAvatar(fileName: string, userId: string): Promise<void> {
      // Delete avatar from DB
      await this.userRepository.findByIdAndUpdate(userId, { avatar: "" });

      // Delete image from hard drive
      const filePath = path.resolve(staticPath, fileName);
      await unlinker(filePath);
   }

}