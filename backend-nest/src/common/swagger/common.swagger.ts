import { ApiProperty } from "@nestjs/swagger";

export class DefaultError {
   @ApiProperty({ example: 500 })
   readonly statusCode: number;

   @ApiProperty({ example: "Error message" })
   readonly message: string;
}

export class SuccessResponse {
   @ApiProperty({ example: "Success" })
   readonly message: string;
}

export class UnauthorizedError {
   @ApiProperty({ example: 401 })
   readonly statusCode: number;

   @ApiProperty({ example: "Invalid or expired token" })
   readonly message: string;
}

export class FileSizeError {
   @ApiProperty({ example: 413 })
   readonly statusCode: number;

   @ApiProperty({ example: "File size must be less than 3 mb" })
   readonly message: string;
}

export class FileTypeError {
   @ApiProperty({ example: 422 })
   readonly statusCode: number;

   @ApiProperty({ example: "Invalid file type" })
   readonly message: string;
}

export class ObjNotExistError {
   @ApiProperty({ example: 404 })
   readonly statusCode: number;

   @ApiProperty({ example: "Object does not exist" })
   readonly message: string;
}

export class ObjectIdError {
   @ApiProperty({ example: 400 })
   readonly statusCode: number;

   @ApiProperty({ example: "Object ID is not valid" })
   readonly message: string;
}

export class UploadImageResponse {
   @ApiProperty({ example: "1677531282980.jpg" })
   readonly image: string;
}