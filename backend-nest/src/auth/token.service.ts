import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { IAccessTokenPair } from "./interface/refresh-response.interface";

@Injectable()
export class TokenService {

   constructor(private jwtService: JwtService) {
   }

   generatePair(payload: any): IAccessTokenPair {
      try {
         return {
            accessToken: this.jwtService.sign(payload, { secret: "access-secret", expiresIn: "1d" }),
            refreshToken: this.jwtService.sign(payload, { secret: "refresh-secret", expiresIn: "7d" }),
         };

      } catch (e) {
         throw new HttpException("JWT: Error", HttpStatus.INTERNAL_SERVER_ERROR);
      }
   }

   generate(payload: any, secret: string): string {
      try {
         return this.jwtService.sign(payload, { secret, expiresIn: "1d" });
      } catch (e) {
         throw new HttpException("JWT: Error", HttpStatus.INTERNAL_SERVER_ERROR);
      }
   }

   tokenVerify(token: string, secret: string): any {
      try {
         return this.jwtService.verify(token, { secret });
      } catch (e) {
         throw new HttpException("Invalid or expired token", HttpStatus.UNAUTHORIZED);
      }
   }


}

