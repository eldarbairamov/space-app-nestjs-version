import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { MongooseModule } from "@nestjs/mongoose";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { ActionToken, ActionTokenSchema, OAuth, OAuthSchema } from "./model";
import { ActionTokenRepository, OAuthRepository } from "./repository";
import { AccessStrategy, LoginStrategy, RefreshStrategy } from "./strategy";
import { ConfigService } from "@nestjs/config";
import { UserRepository } from "@src/user/repository/user.repository";
import { UserModule } from "@src/user/user.module";
import { EmailService } from "@src/common/email.service";
import { User, UserSchema } from "@src/user/model/user.model";
import { TokenService } from "@src/common/token.service";


@Module( {

   imports: [
      MongooseModule.forFeature( [
         { name: User.name, schema: UserSchema },
         { name: OAuth.name, schema: OAuthSchema },
         { name: ActionToken.name, schema: ActionTokenSchema },
      ] ),
      PassportModule,
      JwtModule.register( {} ),
      UserModule,
   ],

   controllers: [ AuthController ],

   providers: [
      ConfigService,
      AuthService,
      LoginStrategy,
      AccessStrategy,
      RefreshStrategy,
      EmailService,
      TokenService,
      UserRepository,
      OAuthRepository,
      ActionTokenRepository,
   ],
} )
export class AuthModule {

}