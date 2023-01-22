import { model, Schema, type SchemaDefinitionProperty, Types } from "mongoose";
import { IActionTokenDatabase, IActionTokenSchema } from "../interface";

const actionTokenSchema = new Schema<IActionTokenSchema>({
   tokenOwnerId: { type: Types.ObjectId, ref: "User" } as SchemaDefinitionProperty<Types.ObjectId>,
   tokenType: { type: String },
   token: { type: String },

}, { timestamps: true, versionKey: false });

export const ActionTokenModel = model<IActionTokenDatabase>("ActionToken", actionTokenSchema);
