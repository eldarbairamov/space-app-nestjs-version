import { NoteRepository, UserRepository } from "../../repository";
import { notePresenter } from "../../presenter";
import { INoteResponse } from "../../interface";
import { UserDocument } from "../../model";

export const addNoteService = async (userId: UserDocument["id"]): Promise<INoteResponse> => {

   // Save note to DB
   const note = await NoteRepository.create({ ownerId: userId });

   // Update user
   await UserRepository.findByIdAndUpdate(userId, { $push: { notesIds: note.id } });

   // Return presented data to client
   return notePresenter(note);

};