import { Types } from "mongoose";

export interface ITaskResponse {
   readonly id: string | Types.ObjectId;
   readonly title: string;
   readonly isCompleted: boolean;
}