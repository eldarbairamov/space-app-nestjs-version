import { IMomentResponse, IMomentsResponse } from "../../moment/interface/moment-response.interface";
import { ApiProperty } from "@nestjs/swagger";

export class MomentResponse implements IMomentResponse {
   @ApiProperty({ example: "63dfe16eda233c96fc6e2604" })
   readonly id: string;

   @ApiProperty({ example: "My birthday" })
   readonly title: string;

   @ApiProperty({ example: "3820175937533.jpg" })
   readonly photo: string;

   @ApiProperty({ example: 1677517089217 })
   readonly date: number;

   @ApiProperty({ example: "Location" })
   readonly location: string;

   @ApiProperty({ example: 1677517089217 })
   readonly createdAt: number;

   @ApiProperty({ example: [ "tag" ] })
   readonly tags: string[];
}

export class MomentsResponse implements IMomentsResponse {
   @ApiProperty({ type: MomentResponse })
   data: IMomentResponse[];

   @ApiProperty({ example: [ "tags" ] })
   readonly tagsForFilter: (string | undefined)[];
}

export class UpdateMomentBody {
   @ApiProperty({ example: "My birthday" })
   readonly title: string;

   @ApiProperty({ example: 1677517089217 })
   readonly date: number;

   @ApiProperty({ example: "Location" })
   readonly location: string;

   @ApiProperty({ example: [ "tag" ] })
   readonly tags: string[];
}