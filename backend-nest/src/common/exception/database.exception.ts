import { HttpException, HttpStatus } from "@nestjs/common";

export const databaseException = (e) => {
   console.log(e);
   return new HttpException("Database: Error", HttpStatus.INTERNAL_SERVER_ERROR);
};