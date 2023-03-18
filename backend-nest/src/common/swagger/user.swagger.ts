import { IUserInfoResponse } from "@src/user/interface/user-info-response.interface";
import { ApiProperty } from "@nestjs/swagger";

export class GetUserResponse implements IUserInfoResponse {
   @ApiProperty({ example: "Tom", type: String })
   readonly name: string;

   @ApiProperty({ example: "Peterson", type: String })
   readonly surname: string;

   @ApiProperty({ example: "tommy_gun", type: String })
   readonly username: string;

   @ApiProperty({ example: "1677458538916.jpg", type: String })
   readonly avatar: string;

   @ApiProperty({ example: 3, type: Number })
   readonly notesCount: number;

   @ApiProperty({ example: 1, type: Number })
   readonly plansCount: number;

   @ApiProperty({ example: 2, type: Number })
   readonly momentsCount: number;
}

export class ChangeEmailAcceptBody {
   @ApiProperty({
      example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2RmZTA3Nzc0NjNjYjhlODE1NzUyODciLCJlbWFpbCI6ImVsZGFyaW8uYmF5cmFtb3ZAZ21haWwuY29tIiwiaWF0IjoxNjc1NjE2OTkzLCJleHAiOjE2NzU3MDMzOTN9.Mg7ahfZrBwUmqaZLqE4CWR1ALvPqYHmusf10IvKzzi4",
      required: true, type: String,
   })
   readonly confirmationToken: string;
}

export class ChangeEmailRequest {
   @ApiProperty({ example: "johndoe@gmail.com", type: String })
   readonly email: string;
}

export class ChangePasswordBody {
   @ApiProperty({ example: "currpass1", required: true, type: String })
   readonly currentPassword: string;

   @ApiProperty({ example: "newpass2", required: true, type: String })
   readonly newPassword: string;
}

export class DeleteAvatarBody {
   @ApiProperty({ example: "1675615755215.jpg", required: true, type: String })
   readonly fileName: string;
}