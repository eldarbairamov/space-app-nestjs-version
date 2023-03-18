import { IMomentResponse, IMomentsResponse } from "@src/moment/interface/moment-response.interface";
import { ApiProperty } from "@nestjs/swagger";

export class MomentResponse implements IMomentResponse {
   @ApiProperty({ example: "63dfe16eda233c96fc6e2604", type: String })
   readonly id: string;

   @ApiProperty({ example: "My birthday", type: String })
   readonly title: string;

   @ApiProperty({ example: "3820175937533.jpg", type: String })
   readonly photo: string;

   @ApiProperty({ example: 1677517089217, type: Number })
   readonly date: number;

   @ApiProperty({ example: "Location", type: String })
   readonly location: string;

   @ApiProperty({ example: 1677517089217, type: Number })
   readonly createdAt: number;

   @ApiProperty({ example: "tag", type: String })
   readonly tag: string;
}

export class MomentsResponse implements IMomentsResponse {
   @ApiProperty({ type: MomentResponse })
   readonly data: IMomentResponse[];

   @ApiProperty({ example: [ "tags" ], type: [ String ] })
   readonly tagsForFilter: (string | undefined)[];

   @ApiProperty({ example: 30, type: Number })
   readonly count: number;
}

export class UpdateMomentBody {
   @ApiProperty({ example: "My birthday", required: false, type: String })
   readonly title: string;

   @ApiProperty({ example: 1677517089217, required: false, type: Number })
   readonly date: number;

   @ApiProperty({ example: "Location", required: false, type: String })
   readonly location: string;

   @ApiProperty({ example: "tag", required: false, type: String })
   readonly tag: string;
}