import { IUserInfoResponse } from "../../user/interface/user-info-response.interface";
import { ApiProperty } from "@nestjs/swagger";
import { IUpdateProfileResponse } from "../../user/interface/update-profile-response.interface";

export class GetUserResponse implements IUserInfoResponse {
   @ApiProperty({ example: "Tom" })
   readonly name: string;

   @ApiProperty({ example: "Peterson" })
   readonly surname: string;

   @ApiProperty({ example: "tommy_gun" })
   readonly username: string;

   @ApiProperty({ example: "1677458538916.jpg" })
   readonly avatar: string;

   @ApiProperty({ example: 3 })
   readonly notesCount: number;

   @ApiProperty({ example: 1 })
   readonly plansCount: number;

   @ApiProperty({ example: 2 })
   readonly momentsCount: number;
}

export class UpdateUser implements IUpdateProfileResponse {
   @ApiProperty({ example: "John" })
   readonly name: string;

   @ApiProperty({ example: "Doe" })
   readonly surname: string;

   @ApiProperty({ example: "johnny_mnemonick" })
   readonly username: string;
}

export class ChangeEmailAcceptBody {
   @ApiProperty({ example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2RmZTA3Nzc0NjNjYjhlODE1NzUyODciLCJlbWFpbCI6ImVsZGFyaW8uYmF5cmFtb3ZAZ21haWwuY29tIiwiaWF0IjoxNjc1NjE2OTkzLCJleHAiOjE2NzU3MDMzOTN9.Mg7ahfZrBwUmqaZLqE4CWR1ALvPqYHmusf10IvKzzi4" })
   readonly confirmationToken: string;
}

export class ChangeEmailRequest {
   @ApiProperty({ example: "johndoe@gmail.com" })
   readonly email: string;
}

export class ChangePasswordBody {
   @ApiProperty({ example: "currpass1" })
   readonly currentPassword: string;

   @ApiProperty({ example: "newpass2" })
   readonly newPassword: string;
}

export class DeleteAvatarBody {
   @ApiProperty({ example: "1675615755215.jpg" })
   readonly fileName: string;
}