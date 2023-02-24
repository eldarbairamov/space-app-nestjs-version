import { Types } from "mongoose";

export class IPlanResponse {
   readonly id: string | Types.ObjectId
   readonly title: string
   readonly lastModified: number
}