import { model, Schema, type SchemaDefinitionProperty, Types } from "mongoose";
import { type IPlanDatabase, type IPlanSchema } from "../interface";

const PlanSchema = new Schema<IPlanSchema>({
   planOwnerId: { type: Types.ObjectId, ref: "User" } as SchemaDefinitionProperty<string | undefined>,
   title: { type: String, default: "Новий план" },
   tasksIds: [ { type: Types.ObjectId, ref: "Task" } ],
}, { timestamps: true, versionKey: false });

export const PlanModel = model<IPlanDatabase>("Plan", PlanSchema);
