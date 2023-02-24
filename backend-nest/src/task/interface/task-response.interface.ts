import { Types } from "mongoose";

export class ITaskResponse {
   readonly id: string | Types.ObjectId;
   readonly title: string;
   readonly isCompleted: boolean;
}