import { NoteRepository, UserRepository } from "../../repository";
import { IDeleteItemBody } from "../../interface/common.interface";
import { NoteDocument, UserDocument } from "../../model";
import { INotesResponse } from "../../interface";
import { allNotesPresenter } from "../../presenter";

export const deleteNoteService = async (body: IDeleteItemBody, noteId: NoteDocument["id"], userId: UserDocument["id"]): Promise<INotesResponse> => {
   // Delete note
   await NoteRepository.findByIdAndDelete(noteId);

   // Update user and return updated note list
   const [ notes, count ] = await Promise.all([
      NoteRepository.find({ ownerId: userId }, body.searchKey, body.limit),
      NoteRepository.count({ ownerId: userId }),
      UserRepository.findByIdAndUpdate(userId, { $pull: { notesIds: noteId } }),
   ]);

   return {
      data: allNotesPresenter(notes),
      count,
   };
};