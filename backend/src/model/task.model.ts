import { model, Schema, type SchemaDefinitionProperty, Types } from "mongoose";
import { type ITaskDatabase, type ITaskSchema } from "../interface";

const TaskSchema = new Schema<ITaskSchema>({
   title: { type: String },
   isCompleted: { type: Boolean, default: false },
   planId: { type: Types.ObjectId, ref: "Plan" } as SchemaDefinitionProperty<string | undefined>,
   ownerId: { type: Types.ObjectId, ref: "User" } as SchemaDefinitionProperty<string | undefined>,
},
   { versionKey: false, timestamps: true });

export const TaskModel = model<ITaskDatabase>("Task", TaskSchema);