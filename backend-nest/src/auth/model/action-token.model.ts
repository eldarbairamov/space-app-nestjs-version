import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { User } from "@src/user/model/user.model";

export type ActionTokenDocument = HydratedDocument<ActionToken>

@Schema()
export class ActionToken {

   @Prop()
   token: string;

   @Prop()
   tokenType: string;

   @Prop({ type: Types.ObjectId, ref: "User" })
   ownerId: User;

}

export const ActionTokenSchema = SchemaFactory.createForClass(ActionToken);