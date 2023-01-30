import { model, Schema, type SchemaDefinitionProperty, Types } from "mongoose";
import { type INoteDatabase, type INoteSchema } from "../interface";

const NoteSchema = new Schema<INoteSchema>({
   noteOwnerId: { type: Types.ObjectId, ref: "User" } as SchemaDefinitionProperty<string | undefined>,
   title: { type: String, default: "Нова замітка" },
   body: { type: String },
}, { timestamps: true, versionKey: false });

export const NoteModel = model<INoteDatabase>("Note", NoteSchema);