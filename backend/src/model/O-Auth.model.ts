import { model, Schema, type SchemaDefinitionProperty, Types } from "mongoose";
import { type IOAuthDatabase, type IOAuthSchema } from "../interface";

const OAuthSchema = new Schema<IOAuthSchema>({
   accessToken: { type: String },
   refreshToken: { type: String },
   ownerId: { type: Types.ObjectId, ref: "User" } as SchemaDefinitionProperty<string | undefined>,

}, { timestamps: true, versionKey: false });

export const OAuthModel = model<IOAuthDatabase>("OAuth", OAuthSchema);