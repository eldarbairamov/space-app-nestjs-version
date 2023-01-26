import { model, Schema, type SchemaDefinitionProperty, Types } from "mongoose";
import { type IPlanDatabase, type IPlanSchema } from "../interface";

const PlanSchema = new Schema<IPlanSchema>({
   planOwnerId: { type: Types.ObjectId, ref: "User" } as SchemaDefinitionProperty<Types.ObjectId>,
   title: { type: String },
}, { timestamps: true, versionKey: false });

export const PlanModel = model<IPlanDatabase>("Plan", PlanSchema);
