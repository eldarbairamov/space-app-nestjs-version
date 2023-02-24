import { Injectable } from "@nestjs/common";
import { NotePresenter } from "./presenter/note.presenter";
import { UserRepository } from "../user/repository/user.repository";
import { NoteRepository } from "./repository/note.repository";
import { CreateNoteDto } from "./dto";
import { INoteResponse } from "./interface/note-response.interface";
import { UserDocument } from "../user/model/user.model";
import { NoteDocument } from "./model/note.model";

@Injectable()
export class NoteService {
   constructor(
      private userRepository: UserRepository,
      private noteRepository: NoteRepository,
      private notePresenter: NotePresenter,
   ) {
   }

   async addNote(userId: UserDocument["id"]): Promise<INoteResponse> {
      // Create note
      const note = await this.noteRepository.create({ ownerId: userId });

      // Update user
      await this.userRepository.findByIdAndUpdate(userId, { $push: { notesIds: note.id } });

      // Return presented data to client
      return this.notePresenter.single(note);
   }

   async updateNote(noteId: UserDocument["id"], dto: CreateNoteDto): Promise<INoteResponse> {
      // Update note
      const note = await this.noteRepository.findByIdAndUpdate(noteId, dto);

      // Return presented data to client
      return this.notePresenter.single(note);
   }

   async getNotes(userId: UserDocument["id"], searchKey: string): Promise<INoteResponse[]> {
      // Find notes
      const notes = await this.noteRepository.find({ ownerId: userId }, searchKey);

      // Return presented data to client
      return this.notePresenter.array(notes);
   }

   async deleteNote(noteId: NoteDocument["id"], userId: UserDocument["id"]): Promise<void> {
      // Delete note
      await this.noteRepository.findByIdAndDelete(noteId);

      // Update user
      await this.userRepository.findByIdAndUpdate(userId, { $pull: { notesIds: noteId } });
   }

}