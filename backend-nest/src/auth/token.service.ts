import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { IAccessTokenPair } from "./interface/refresh-response.interface";

@Injectable()
export class TokenService {

   constructor(private jwtService: JwtService) {
   }

   tokenPair(userId: string): IAccessTokenPair {
      try {
         return {
            accessToken: this.jwtService.sign({ userId }, { secret: "access-secret", expiresIn: "1d" }),
            refreshToken: this.jwtService.sign({ userId }, { secret: "refresh-secret", expiresIn: "7d" }),
         };

      } catch (e) {
         throw new HttpException("JWT: Error", HttpStatus.INTERNAL_SERVER_ERROR);
      }
   }

}

