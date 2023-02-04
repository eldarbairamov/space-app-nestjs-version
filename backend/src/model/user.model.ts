import { model, Schema, Types } from "mongoose";
import { type IUserDatabase, type IUserSchema } from "../interface";

const UserSchema = new Schema<IUserSchema>({
   username: { type: String, required: true },
   email: { type: String, required: true, unique: true },
   password: { type: String, required: true },
   isActivated: { type: Boolean, default: false },
   avatar: { type: String, default: "" },
   name: { type: String, default: "" },
   surname: { type: String, default: "" },
   notesIds: [ { type: Types.ObjectId, ref: "Note" } ],
   plansIds: [ { type: Types.ObjectId, ref: "Plan" } ],
   memoriesIds: [ { type: Types.ObjectId, ref: "Moment" } ],

}, { timestamps: true, versionKey: false });

export const UserModel = model<IUserDatabase>("User", UserSchema);
