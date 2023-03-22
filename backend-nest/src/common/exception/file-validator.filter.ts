import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Response } from "express";

@Catch(HttpException)
export class FileValidatorFilter implements ExceptionFilter {
   catch(exception: any, host: ArgumentsHost) {

      const statusCode = exception.status;
      const message = exception.message
      const response = host.switchToHttp().getResponse<Response>();

      if (statusCode === 413) response.status(413).json({
         statusCode: 413,
         message: "File size must be less than 10 mb"
      });

      if (statusCode === 422) response.status(422).json({
         statusCode: 422,
         message: "Invalid file type"
      });

      response.status(statusCode).json({statusCode, message })

   }
}
