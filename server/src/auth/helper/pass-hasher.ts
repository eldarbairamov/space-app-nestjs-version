import * as bcrypt from "bcryptjs";
import { HttpException, HttpStatus } from "@nestjs/common";

export const passHasher = async ( dry ) => {
   try {
      return await bcrypt.hash( dry, 8 );
   }
   catch ( e ) {
      throw new HttpException( "Bcrypt: Hash error", HttpStatus.INTERNAL_SERVER_ERROR );
   }
};