import { unlink } from "fs/promises";
import { HttpException, HttpStatus } from "@nestjs/common";

export const unlinker = async ( path: string ) => {
   try {
      await unlink( path );
   }
   catch ( e ) {
      const error = e as Error;
      console.log( error.message );
      throw new HttpException( "Unlink: Error", HttpStatus.INTERNAL_SERVER_ERROR );
   }
};