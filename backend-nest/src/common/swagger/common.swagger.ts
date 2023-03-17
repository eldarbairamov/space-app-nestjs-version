import { ApiProperty } from "@nestjs/swagger";

export class DefaultError {
   @ApiProperty({ example: 500, type: Number })
   readonly statusCode: number;

   @ApiProperty({ example: "Error message", type: String })
   readonly message: string;
}

export class SuccessResponse {
   @ApiProperty({ example: "Success", type: String })
   readonly message: string;
}

export class UnauthorizedError {
   @ApiProperty({ example: 401, type: Number })
   readonly statusCode: number;

   @ApiProperty({ example: "Invalid or expired token", type: String })
   readonly message: string;
}

export class FileSizeError {
   @ApiProperty({ example: 413, type: Number })
   readonly statusCode: number;

   @ApiProperty({ example: "File size must be less than 10 mb", type: String })
   readonly message: string;
}

export class FileTypeError {
   @ApiProperty({ example: 422, type: Number })
   readonly statusCode: number;

   @ApiProperty({ example: "Invalid file type", type: String })
   readonly message: string;
}

export class ObjNotExistError {
   @ApiProperty({ example: 404, type: Number })
   readonly statusCode: number;

   @ApiProperty({ example: "Object does not exist", type: String })
   readonly message: string;
}

export class ObjectIdError {
   @ApiProperty({ example: 400, type: Number })
   readonly statusCode: number;

   @ApiProperty({ example: "Object ID is not valid", type: String })
   readonly message: string;
}

export class UploadImageResponse {
   @ApiProperty({ example: "1677531282980.jpg", type: String })
   readonly image: string;
}

export class DeleteItemBody {
   @ApiProperty({ example: 31, type: Number, required: false })
   readonly limit: number;

   @ApiProperty({ example: "Coffee", type: String, required: false })
   readonly searchKey: string;
}