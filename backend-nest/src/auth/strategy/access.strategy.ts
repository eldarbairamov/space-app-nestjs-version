import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";
import { OAuthRepository } from "../repository";
import { ConfigService } from "@nestjs/config";
import { IEnvironmentVariables } from "@src/config/env-variables.interface";

@Injectable()
export class AccessStrategy extends PassportStrategy(Strategy, "access") {

   constructor(
      private oAuthRepository: OAuthRepository,
      private configService: ConfigService<IEnvironmentVariables>,
   ) {
      super({
         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
         ignoreExpiration: false,
         secretOrKey: configService.get("SECRET_ACCESS_TOKEN_KEY"),
         passReqToCallback: true,
      });
   }

   async validate(req: Request, decoded: any) {
      const accessToken = req.headers.authorization?.split(" ")[1];

      const isTokenActual = await this.oAuthRepository.findOne({ accessToken });
      if (!isTokenActual) throw new HttpException("Invalid or expired token", HttpStatus.UNAUTHORIZED);

      const userId = decoded.userId;
      return { userId, token: accessToken };
   }

}
