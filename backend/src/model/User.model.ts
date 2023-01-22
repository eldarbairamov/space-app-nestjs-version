import { model, Schema } from "mongoose";
import { type IUserDatabase, type IUserSchema } from "../interface";

const UserSchema = new Schema<IUserSchema>({
   username: { type: String, required: true },
   email: { type: String, required: true, unique: true },
   password: { type: String, required: true },
   isActivated: { type: Boolean, default: false },
   avatar: { type: String },
   name: { type: String },
   surname: { type: String },

}, { timestamps: true, versionKey: false });

export const UserModel = model<IUserDatabase>("User", UserSchema);
