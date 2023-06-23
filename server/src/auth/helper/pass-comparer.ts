import * as bcrypt from "bcryptjs";
import { HttpException, HttpStatus } from "@nestjs/common";

export const passComparer = async ( dry: string, hashed: string ) => {
   try {
      return await bcrypt.compare( dry, hashed );
   }
   catch ( e ) {
      throw new HttpException( "Bcrypt: Compare error", HttpStatus.INTERNAL_SERVER_ERROR );
   }
};