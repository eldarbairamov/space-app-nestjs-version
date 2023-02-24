import { ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { UserDocument } from "../user/model/user.model";
import { JwtService } from "@nestjs/jwt";
import { v4 as uuid } from "uuid";
import { UserRepository } from "../user/repository/user.repository";
import { EmailService } from "./email.service";
import { TokenService } from "./token.service";
import { passComparer, passHasher } from "./helper";
import { RegistrationDto, ResetPasswordDto } from "./dto";
import { ActionTokenRepository, OAuthRepository } from "./repository";
import { ILoginResponse } from "./interface/login-response.interface";
import { FORGOT_PASSWORD, REGISTRATION } from "../common/constants/email-action.constant";
import { ACTIVATION_TOKEN_TYPE, RESET_PASSWORD_TOKEN_TYPE } from "../common/constants/token-type.constant";


@Injectable()
export class AuthService {

   constructor(
      private emailService: EmailService,
      private tokenService: TokenService,
      private jwtService: JwtService,
      private actionTokenRepository: ActionTokenRepository,
      private oAuthRepository: OAuthRepository,
      private userRepository: UserRepository,
   ) {
   }

   async registration(dto: RegistrationDto): Promise<void> {
      // Hash password
      const hashedPassword = await passHasher(dto.password);

      // Save user to DB
      const candidate = await this.userRepository.create({ ...dto, password: hashedPassword });

      // Generate activation token
      const activationToken = uuid();

      // Save action token to DB
      await this.actionTokenRepository.create({
         token: activationToken,
         tokenType: ACTIVATION_TOKEN_TYPE,
         ownerId: candidate.id,
      });

      // Send activation email
      await this.emailService.send(dto.email, REGISTRATION, {
         activationCode: activationToken,
         username: candidate.username,
      });
   }

   async login(user: UserDocument): Promise<ILoginResponse> {
      // Check is user activated
      if (!user.isActivated) throw new ForbiddenException({ message: "Активуйте аккаунт" });

      // Generate access token pair
      const tokenPair = this.tokenService.tokenPair(user.id);

      // Save tokens to DB
      await this.oAuthRepository.create({ ownerId: user.id, ...tokenPair });

      return { username: user.username, ...tokenPair };
   }

   async validateUser(email: string, password: string): Promise<UserDocument> {
      // Find user
      const user = await this.userRepository.findOne({ email });

      // Compare passwords
      const isPasswordValid = user ? await passComparer(password, user.password) : null;

      // Condition
      if (!user || !isPasswordValid) return null;

      return user;
   }

   async activation(activationCode: string) {
      // Find and delete action token
      const actionTokenInfo = await this.actionTokenRepository.findOneAndDelete({ token: activationCode });
      if (!actionTokenInfo) throw new UnauthorizedException({ message: "Невалідний код активації" });

      // Update user status
      await this.userRepository.findByIdAndUpdate(actionTokenInfo.ownerId, { isActivated: true });
   }

   async forgotPassword(email: string) {
      // Find user
      const user = await this.userRepository.findOne({ email });
      if (!user) throw new UnauthorizedException({ message: "Користувача не знайдено" });

      // Generate link
      const resetPasswordToken = this.jwtService.sign({ userId: user.id }, {
         secret: "forgot password",
         expiresIn: "1d",
      });
      const resetPasswordLink = `${ process.env.CLIENT_URL }/password_reset/new?token=${ resetPasswordToken }`;

      // Save action token to DB
      await this.actionTokenRepository.create({
         token: resetPasswordToken,
         tokenType: RESET_PASSWORD_TOKEN_TYPE,
         ownerId: user.id,
      });

      // Send email
      await this.emailService.send(email, FORGOT_PASSWORD, { resetPasswordLink, username: user.username });
   }

   async resetPassword(dto: ResetPasswordDto) {
      // Delete action token
      const actionTokenInfo = await this.actionTokenRepository.findOneAndDelete({ token: dto.resetPasswordToken });

      if (!actionTokenInfo) throw new UnauthorizedException("Invalid token");

      // Define token owner ID
      const tokenOwnerId = actionTokenInfo.ownerId;

      // Hash password
      const hashedPassword = await passHasher(dto.password);

      // Update password
      await this.userRepository.findByIdAndUpdate(tokenOwnerId, { password: hashedPassword });
   }

   async logout(token: string) {
      // Delete tokens from DB
      await this.oAuthRepository.findOne({ accessToken: token });
   }

   async refresh(userId: UserDocument["id"], refreshToken: string) {
      // Generate new token pair
      const accessTokenPair = this.tokenService.tokenPair(userId);

      // Delete old record and create new
      await Promise.all([
         this.oAuthRepository.deleteOne({ refreshToken }),
         this.oAuthRepository.create({ ...accessTokenPair, ownerId: userId }),
      ]);

      // Return data to client
      return accessTokenPair;
   }

}