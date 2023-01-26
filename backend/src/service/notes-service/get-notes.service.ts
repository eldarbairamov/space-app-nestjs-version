import { NoteRepository } from "../../repository";
import { allNotesPresenter } from "../../presenter";

export const getNotesService = async (userId: string) => {

   // Find all notes in DB
   const notesFromDb = await NoteRepository.findAll({ noteOwnerId: userId });

   // Return presented data for client
   return allNotesPresenter(notesFromDb);

};