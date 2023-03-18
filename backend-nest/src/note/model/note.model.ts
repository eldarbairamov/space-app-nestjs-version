import mongoose, { HydratedDocument, SchemaTimestampsConfig } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "@src/user/model/user.model";

export type NoteDocument = HydratedDocument<Note> & SchemaTimestampsConfig

@Schema({ versionKey: false, timestamps: true })
export class Note {

   @Prop({ default: "Нова замітка" })
   title: string;

   @Prop()
   body: string;

   @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
   ownerId: User;

}

export const NoteSchema = SchemaFactory.createForClass(Note);