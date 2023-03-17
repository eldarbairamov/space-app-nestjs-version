import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "../../user/model/user.model";
import mongoose, { HydratedDocument, SchemaTimestampsConfig } from "mongoose";
import { Task } from "../../task/model/task.model";

export type PlanDocument = HydratedDocument<Plan> & SchemaTimestampsConfig

@Schema({ versionKey: false, timestamps: true })
export class Plan {

   @Prop({ default: "Новий план" })
   title: string;

   @Prop({ type: [ { type: mongoose.Schema.Types.ObjectId, ref: "Task" } ] })
   tasksIds: Task[];

   @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
   ownerId: User;

}

export const PlanSchema = SchemaFactory.createForClass(Plan);