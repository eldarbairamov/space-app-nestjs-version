import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, SchemaTimestampsConfig } from "mongoose";
import { User } from "@src/user/model/user.model";

export type MomentDocument = HydratedDocument<Moment> & SchemaTimestampsConfig

@Schema({ versionKey: false, timestamps: true })
export class Moment {

   @Prop({ default: "Новий момент" })
   title: string;

   @Prop({ default: Date.now })
   date: Date;

   @Prop({ default: "" })
   photo: string;

   @Prop({ default: "Локація" })
   location: string;

   @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
   ownerId: User;

   @Prop({ default: "тег" })
   tag: string;

}

export const MomentSchema = SchemaFactory.createForClass(Moment);