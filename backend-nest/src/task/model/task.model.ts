import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "@src/user/model/user.model";
import { Plan } from "@src/plan/model/plan.model";

export type TaskDocument = HydratedDocument<Task>

@Schema({ versionKey: false, timestamps: true })
export class Task {

   @Prop()
   title: string;

   @Prop({ default: false })
   isCompleted: boolean;

   @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
   ownerId: User;

   @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Plan" })
   planId: Plan;

}

export const TaskSchema = SchemaFactory.createForClass(Task);