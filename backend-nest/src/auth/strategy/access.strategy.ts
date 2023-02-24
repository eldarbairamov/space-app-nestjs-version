import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";
import { OAuthRepository } from "../repository";

@Injectable()
export class AccessStrategy extends PassportStrategy(Strategy, "access") {

   constructor(
      private oAuthRepository: OAuthRepository) {
      super({
         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
         ignoreExpiration: false,
         secretOrKey: "access-secret",
         passReqToCallback: true,
      });
   }

   async validate(req: Request, decoded: any) {
      const accessToken = req.headers.authorization?.split(" ")[1];
      const isTokenActual = await this.oAuthRepository.findOne({ accessToken });
      if (!isTokenActual) throw new UnauthorizedException("Unauthorized");

      const userId = decoded.userId;
      return { userId, token: accessToken };
   }

}