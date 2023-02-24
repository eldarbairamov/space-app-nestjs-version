import { Types } from "mongoose";

export class INoteResponse {
   readonly id: string | Types.ObjectId;
   readonly title: string;
   readonly body: string;
   readonly lastModified: number;
}