import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Response } from "express";

@Catch(HttpException)
export class FileValidatorFilter implements ExceptionFilter {
   catch(exception: any, host: ArgumentsHost) {
      const statusCode = exception.status;
      const message = exception.response;
      const response = host.switchToHttp().getResponse<Response>();

      if (statusCode === 413) response.json({ statusCode: 413, message: "File size must be less than 3 mb" });

      response.json({ statusCode, message });
   }
}