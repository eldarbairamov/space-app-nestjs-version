import { NoteRepository } from "../../repository";
import { allNotesPresenter } from "../../presenter";

export const getNotesService = async (userId: string) => {

   // Find all notes in DB
   const notes = await NoteRepository.findAll({ noteOwnerId: userId });

   // Return presented data for client
   return allNotesPresenter(notes);

};