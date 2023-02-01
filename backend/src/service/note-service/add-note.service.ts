import { NoteRepository, UserRepository } from "../../repository";
import { notePresenter } from "../../presenter";
import { type INoteDto } from "../../interface";

export const addNoteService = async (userId: string): Promise<INoteDto> => {

   // Create note initial state
   const initialNote = {
      body: "",
      ownerId: userId,
   };

   // Save note initial state to DB
   const note = await NoteRepository.create(initialNote);

   // Update user
   await UserRepository.updateById(userId, { $push: { notesIds: note._id } });

   // Return presented data to client
   return notePresenter(note);

};