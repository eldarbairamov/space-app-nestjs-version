import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { v4 as uuid } from "uuid";
import { passComparer, passHasher } from "./helper";
import { RegistrationDto, ResetPasswordDto } from "./dto";
import { ActionTokenRepository, OAuthRepository } from "./repository";
import { ILoginResponse } from "./interface";
import { Cron, CronExpression } from "@nestjs/schedule";
import { ConfigService } from "@nestjs/config";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { UserRepository } from "@src/user/repository/user.repository";
import { UserDocument } from "@src/user/model/user.model";
import { ACTIVATION_TOKEN_TYPE, FORGOT_PASSWORD, REGISTRATION, RESET_PASSWORD_TOKEN_TYPE } from "@src/common/constants";
import { EmailService } from "@src/common/email.service";
import { TokenService } from "@src/common/token.service";
import { IEnvironmentVariables } from "@src/config/env-variables.interface";

dayjs.extend( utc );

@Injectable()
export class AuthService {

   constructor(
       private emailService: EmailService,
       private tokenService: TokenService,
       private jwtService: JwtService,
       private actionTokenRepository: ActionTokenRepository,
       private oAuthRepository: OAuthRepository,
       private userRepository: UserRepository,
       private configService: ConfigService<IEnvironmentVariables>,
   ) {

   }

   async registration( dto: RegistrationDto ): Promise<void> {
      // Hash password
      const hashedPassword = await passHasher( dto.password );

      // Save user to DB
      const candidate = await this.userRepository.create( { ...dto, password: hashedPassword } );

      // Generate activation token
      const activationToken = uuid();

      // Save action token to DB
      await this.actionTokenRepository.create( {
         token: activationToken,
         tokenType: ACTIVATION_TOKEN_TYPE,
         ownerId: candidate.id,
      } );

      // Send activation email
      await this.emailService.send( dto.email, REGISTRATION, {
         activationCode: activationToken,
         username: candidate.username,
      } );
   }

   async login( user: UserDocument ): Promise<ILoginResponse> {
      // Generate access token pair
      const tokenPair = this.tokenService.generatePair( { userId: user.id } );

      // Save tokens to DB
      await this.oAuthRepository.create( { ownerId: user.id, ...tokenPair } );

      return { username: user.username, ...tokenPair };
   }

   async validateUser( email: string, password: string ): Promise<UserDocument> {
      // Find user
      const user = await this.userRepository.findOne( { email } );

      // Compare passwords
      const isPasswordValid = user ? await passComparer( password, user.password ) : null;

      // Condition
      if ( !user || !isPasswordValid ) return null;

      return user;
   }

   async activation( activationCode: string ) {
      // Find and delete action token
      const actionTokenInfo = await this.actionTokenRepository.findOneAndDelete( { token: activationCode } );
      if ( !actionTokenInfo ) throw new HttpException( "Activation code is not valid", HttpStatus.UNAUTHORIZED );

      // Update user status
      await this.userRepository.findByIdAndUpdate( actionTokenInfo.ownerId, { isActivated: true } );
   }

   async forgotPassword( email: string, clientUrl: string ) {
      // Find user
      const user = await this.userRepository.findOne( { email } );
      if ( !user ) throw new HttpException( "User is not found", HttpStatus.UNAUTHORIZED );

      // Generate link
      const resetPasswordToken = this.tokenService.generate( { userId: user.id }, this.configService.get( "SECRET_FORGOT_PASS_KEY" ) );
      const resetPasswordLink = `${ clientUrl }/password_reset/new?token=${ resetPasswordToken }`;

      // Save action token to DB
      await this.actionTokenRepository.create( {
         token: resetPasswordToken,
         tokenType: RESET_PASSWORD_TOKEN_TYPE,
         ownerId: user.id,
      } );

      // Send email
      await this.emailService.send( email, FORGOT_PASSWORD, { resetPasswordLink, username: user.username } );
   }

   async resetPassword( dto: ResetPasswordDto ) {
      // Delete action token
      const actionTokenInfo = await this.actionTokenRepository.findOneAndDelete( { token: dto.resetPasswordToken } );

      if ( !actionTokenInfo ) throw new HttpException( "Invalid or expired token", HttpStatus.UNAUTHORIZED );

      // Define token owner ID
      const tokenOwnerId = actionTokenInfo.ownerId;

      // Hash password
      const hashedPassword = await passHasher( dto.password );

      // Update password
      await this.userRepository.findByIdAndUpdate( tokenOwnerId, { password: hashedPassword } );
   }

   async logout( token: string ) {
      // Delete tokens from DB
      await this.oAuthRepository.deleteOne( { accessToken: token } );
   }

   async refresh( userId: UserDocument["id"], refreshToken: string ) {
      // Generate new token pair
      const accessTokenPair = this.tokenService.generatePair( { userId } );

      // Delete old record and create new
      await Promise.all( [
         this.oAuthRepository.deleteOne( { refreshToken } ),
         this.oAuthRepository.create( { ...accessTokenPair, ownerId: userId } ),
      ] );

      // Return data to client
      return accessTokenPair;
   }

   @Cron( CronExpression.EVERY_WEEK )
   async oAuthCleaner() {
      try {
         const weekAgo = dayjs().utc().subtract( 1, "week" ).format();

         await Promise.all( [
            this.oAuthRepository.deleteMany( { createdAt: { $lte: weekAgo } } ),
            this.actionTokenRepository.deleteMany( { createdAt: { $lte: weekAgo } } )
         ] );

         console.log( "Old tokens are cleaned" );

      }
      catch ( e ) {
         const error = e as Error;
         console.log( error.message );
      }
   }


}
