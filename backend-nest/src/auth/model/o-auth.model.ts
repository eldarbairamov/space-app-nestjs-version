import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { User } from "@src/user/model/user.model";

export type OAuthDocument = HydratedDocument<OAuth>

@Schema({ versionKey: false, timestamps: true })
export class OAuth {

   @Prop({ type: Types.ObjectId, ref: "User" })
   ownerId: User;

   @Prop()
   accessToken: string;

   @Prop()
   refreshToken: string;

}

export const OAuthSchema = SchemaFactory.createForClass(OAuth);