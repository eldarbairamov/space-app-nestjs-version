import { NoteRepository } from "../../repository/Note.repository";
import { allNotesPresenter } from "../../presenter/note.presenter";

export const getNotesService = async (userId: string) => {

   // Find all notes in DB
   const notesFromDb = await NoteRepository.findAll({ noteOwnerId: userId });

   // Return presented data for client
   return allNotesPresenter(notesFromDb);
};