import { Injectable } from "@nestjs/common";
import { NotePresenter } from "./presenter/note.presenter";
import { NoteRepository } from "./repository/note.repository";
import { UpdateNoteDto } from "./dto";
import { INoteResponse, INotesResponse } from "./interface/note-response.interface";
import { NoteDocument } from "./model/note.model";
import { UserRepository } from "@src/user/repository/user.repository";
import { UserDocument } from "@src/user/model/user.model";
import { QueryDto } from "@src/common/dto";

@Injectable()
export class NoteService {
   constructor(
       private userRepository: UserRepository,
       private noteRepository: NoteRepository,
       private notePresenter: NotePresenter,
   ) {
   }

   async addNote( userId: UserDocument["id"] ): Promise<INoteResponse> {
      // Create note
      const note = await this.noteRepository.create( { ownerId: userId } );

      // Update user
      await this.userRepository.findByIdAndUpdate( userId, { $push: { notesIds: note.id } } );

      // Return presented data to client
      return this.notePresenter.single( note );
   }

   async getNote( noteId: NoteDocument["id"] ): Promise<INoteResponse> {
      // Find note
      const note = await this.noteRepository.findById( noteId );

      // Return presented data to client
      return this.notePresenter.single( note );
   }

   async updateNote( noteId: NoteDocument["id"], dto: UpdateNoteDto ): Promise<INoteResponse> {
      // Update note
      const note = await this.noteRepository.findByIdAndUpdate( noteId, dto );

      // Return presented data to client
      return this.notePresenter.single( note );
   }

   async getNotes( userId: UserDocument["id"], queryDto: QueryDto ): Promise<INotesResponse> {
      // Find and count notes
      const [ notes, count ] = await Promise.all( [
         this.noteRepository.find( { ownerId: userId }, queryDto ),
         this.noteRepository.count( { ownerId: userId }, queryDto.searchKey ),
      ] );

      // Return presented data to client
      return {
         data: this.notePresenter.array( notes ),
         count,
      };
   }

   async deleteNote( noteId: NoteDocument["id"], userId: UserDocument["id"], queryDto: QueryDto ): Promise<INotesResponse> {
      // Delete note
      await this.noteRepository.findByIdAndDelete( noteId );

      // Update user and return updated note list
      const [ notes, count ] = await Promise.all( [
         this.noteRepository.find( { ownerId: userId }, queryDto ),
         this.noteRepository.count( { ownerId: userId }, queryDto.searchKey ),
         this.userRepository.findByIdAndUpdate( userId, { $pull: { notesIds: noteId } } ),
      ] );

      return {
         data: this.notePresenter.array( notes ),
         count,
      };
   }

}
