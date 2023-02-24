import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";
import { OAuthRepository } from "../repository";

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, "refresh") {

   constructor(
      private oAuthRepository: OAuthRepository) {
      super({
         jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
         ignoreExpiration: false,
         secretOrKey: "refresh-secret",
         passReqToCallback: true,
      });
   }

   async validate(req: Request, decoded: any) {
      const refreshToken = req.body.refreshToken;
      const isTokenActual = await this.oAuthRepository.findOne({ refreshToken });
      if (!isTokenActual) throw new UnauthorizedException("Unauthorized");

      const userId = decoded.userId;
      return { userId, refreshToken };
   }

}