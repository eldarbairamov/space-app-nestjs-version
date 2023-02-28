import { HttpException, HttpStatus } from "@nestjs/common";

export const databaseException = () => {
   throw new HttpException("Database: Error", HttpStatus.INTERNAL_SERVER_ERROR);
};