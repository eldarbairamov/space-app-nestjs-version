import { HydratedDocument, model, ObjectId, Schema, SchemaDefinitionProperty, SchemaTimestampsConfig, Types } from "mongoose";

export interface IOAuth {
   ownerId: ObjectId,
   accessToken: string,
   refreshToken: string,
}

export type OAuthDocument = HydratedDocument<IOAuth> & SchemaTimestampsConfig

const OAuthSchema = new Schema<IOAuth>({
      accessToken: { type: String },
      refreshToken: { type: String },
      ownerId: { type: Types.ObjectId, ref: "User" } as SchemaDefinitionProperty<ObjectId>,
   },
   { timestamps: true, versionKey: false });

export const OAuthModel = model<OAuthDocument>("OAuth", OAuthSchema);