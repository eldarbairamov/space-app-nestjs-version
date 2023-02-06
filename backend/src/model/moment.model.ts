import { Schema } from "mongoose";

export interface IMomentSchema {
   ownerId: string,
   title: string,
   date: string,
   tagsIds: string[]
}

const MomentSchema = new Schema<IMomentSchema>({});