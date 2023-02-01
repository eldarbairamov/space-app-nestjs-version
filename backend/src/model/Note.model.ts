import { model, Schema, type SchemaDefinitionProperty, Types } from "mongoose";
import { type INoteDatabase, type INoteSchema } from "../interface";

const NoteSchema = new Schema<INoteSchema>({
   title: { type: String, default: "Нова замітка" },
   body: { type: String },
   ownerId: { type: Types.ObjectId, ref: "User" } as SchemaDefinitionProperty<string | undefined>,
}, { timestamps: true, versionKey: false });

export const NoteModel = model<INoteDatabase>("Note", NoteSchema);