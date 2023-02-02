import { model, Schema, type SchemaDefinitionProperty, Types } from "mongoose";
import { type IActionTokenDatabase, type IActionTokenSchema } from "../interface";

const actionTokenSchema = new Schema<IActionTokenSchema>({
   token: { type: String },
   tokenType: { type: String },
   ownerId: { type: Types.ObjectId, ref: "User" } as SchemaDefinitionProperty<string | undefined>,

}, { timestamps: true, versionKey: false });

export const ActionTokenModel = model<IActionTokenDatabase>("ActionToken", actionTokenSchema);
