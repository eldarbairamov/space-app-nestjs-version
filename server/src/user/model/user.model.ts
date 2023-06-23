import mongoose, { HydratedDocument } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Moment } from "@src/moment/model/moment.model";
import { Note } from "@src/note/model/note.model";
import { Plan } from "@src/plan/model/plan.model";

export type UserDocument = HydratedDocument<User>

@Schema( { versionKey: false, timestamps: true } )
export class User {

   @Prop( { required: true } )
   username: string;

   @Prop( { unique: true, required: true } )
   email: string;

   @Prop( { required: true } )
   password: string;

   @Prop( { default: false } )
   isActivated: boolean;

   @Prop( { default: "" } )
   name: string;

   @Prop( { default: "" } )
   surname: string;

   @Prop( { default: "" } )
   avatar: string;

   @Prop( { type: [ { type: mongoose.Schema.Types.ObjectId, ref: "Note" } ] } )
   notesIds: Note[];

   @Prop( { type: [ { type: mongoose.Schema.Types.ObjectId, ref: "Plan" } ] } )
   plansIds: Plan[];

   @Prop( { type: [ { type: mongoose.Schema.Types.ObjectId, ref: "Moment" } ] } )
   momentsIds: Moment[];

}

export const UserSchema = SchemaFactory.createForClass( User );