import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model, UpdateQuery } from "mongoose";
import { databaseException } from "../../common/exception/database.exception";
import { Note, NoteDocument } from "../model/note.model";
import { QueryDto } from "../../common/dto/query.dto";

@Injectable()
export class NoteRepository {

   constructor(@InjectModel(Note.name) private noteModel: Model<NoteDocument>) {
   }

   async create(body): Promise<NoteDocument> {
      try {
         return this.noteModel.create(body);
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         databaseException();
      }
   }

   async findById(noteId: NoteDocument["id"]): Promise<NoteDocument> {
      try {
         return this.noteModel.findById(noteId);
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         databaseException();
      }
   }

   async find(filter: FilterQuery<Note>, queryDto = {} as QueryDto): Promise<NoteDocument[]> {
      const { searchKey, limit } = queryDto;
      const filterObj = searchKey ? { ...filter, title: { $regex: searchKey, $options: "i" } } : { ...filter };
      try {
         return this.noteModel.find(filterObj).sort({ updatedAt: "desc" }).limit(limit);
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         databaseException();
      }
   }

   async count(filter: FilterQuery<Note>, searchKey = ""): Promise<number> {
      const filterObj = searchKey ? { ...filter, title: { $in: searchKey } } : { ...filter };
      try {
         return this.noteModel.count(filterObj);
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         databaseException();
      }
   }

   async findByIdAndUpdate(noteId: NoteDocument["id"], update: UpdateQuery<Note>): Promise<NoteDocument> {
      try {
         return this.noteModel.findByIdAndUpdate(noteId, update, { new: true });
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         databaseException();
      }
   }

   async findByIdAndDelete(noteId: NoteDocument["id"]) {
      try {
         return this.noteModel.findByIdAndDelete(noteId);
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         databaseException();
      }
   }

}