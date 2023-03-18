import { INotesResponse } from "@src/interface";
import { NoteRepository, UserRepository } from "@src/repository";
import { NoteDocument, UserDocument } from "@src/model";
import { IDeleteItemBody } from "@src/interface/common.interface";
import { allNotesPresenter } from "@src/presenter";

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