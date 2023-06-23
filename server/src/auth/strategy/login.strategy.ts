import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { AuthService } from "../auth.service";

@Injectable()
export class LoginStrategy extends PassportStrategy( Strategy, "login" ) {
   constructor( private authService: AuthService ) {
      super( { usernameField: "email" } );
   }

   async validate( email: string, password: string ): Promise<any> {
      const user = await this.authService.validateUser( email, password );

      if ( !user ) throw new HttpException( "Wrong email or password", HttpStatus.UNAUTHORIZED );

      if ( !user.isActivated ) throw new HttpException( "Account is not activated", HttpStatus.FORBIDDEN );

      return user;
   }

}