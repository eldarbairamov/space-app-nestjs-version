import { NoteRepository } from "../../repository/Note.repository";
import { allNotesPresenter } from "../../presenter/note.presenter";

export const getNotesService = async (userId: string) => {
   const notesFromDb = await NoteRepository.findAll({ noteOwnerId: userId });
   return allNotesPresenter(notesFromDb)
};