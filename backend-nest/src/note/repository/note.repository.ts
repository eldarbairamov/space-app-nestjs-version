import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model, UpdateQuery } from "mongoose";
import { databaseException } from "../../common/exception/database.exception";
import { Note, NoteDocument } from "../model/note.model";

@Injectable()
export class NoteRepository {

   constructor(@InjectModel(Note.name) private noteModel: Model<NoteDocument>) {
   }

   async create(body): Promise<NoteDocument> {
      try {
         return this.noteModel.create(body);
      } catch (e) {
         databaseException(e);
      }
   }

   async findById(noteId: NoteDocument["id"]): Promise<NoteDocument> {
      try {
         return this.noteModel.findById(noteId);
      } catch (e) {
         databaseException(e);
      }
   }

   async find(filter: FilterQuery<Note>, searchKey: string): Promise<NoteDocument[]> {
      const filterObj = searchKey ? { ...filter, title: { $regex: searchKey, $options: "i" } } : { ...filter };
      try {
         return this.noteModel.find(filterObj).sort({ updatedAt: "desc" });
      } catch (e) {
         databaseException(e);
      }
   }

   async count(filter: FilterQuery<Note>): Promise<number> {
      try {
         return this.noteModel.count(filter);
      } catch (e) {
         databaseException(e);
      }
   }

   async findByIdAndUpdate(noteId: NoteDocument["id"], update: UpdateQuery<Note>): Promise<NoteDocument> {
      try {
         return this.noteModel.findByIdAndUpdate(noteId, update, { new: true });
      } catch (e) {
         databaseException(e);
      }
   }

   async findByIdAndDelete(noteId: NoteDocument["id"]): Promise<NoteDocument> {
      try {
         return this.noteModel.findByIdAndDelete(noteId);
      } catch (e) {
         databaseException(e);
      }
   }

}