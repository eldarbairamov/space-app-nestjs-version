import { model, Schema, type SchemaDefinitionProperty, Types } from "mongoose";
import { type ITaskDatabase, type ITaskSchema } from "../interface";

const TaskSchema = new Schema<ITaskSchema>({
   taskOwnerId: { type: Types.ObjectId, ref: "User" } as SchemaDefinitionProperty<string | undefined>,
   planId: { type: Types.ObjectId, ref: "Plan" } as SchemaDefinitionProperty<string | undefined>,
   title: { type: String },
   isCompleted: { type: Boolean, default: false },
});

export const TaskModel = model<ITaskDatabase>("Task", TaskSchema);