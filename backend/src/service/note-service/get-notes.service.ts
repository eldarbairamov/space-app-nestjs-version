import { NoteRepository } from "../../repository";
import { allNotesPresenter } from "../../presenter";
import { type INoteDto } from "../../interface";

export const getNotesService = async (userId: string): Promise<INoteDto[]> => {

   // Find all notes in DB
   const notes = await NoteRepository.findAll({ ownerId: userId });

   // Return presented data to client
   return allNotesPresenter(notes);

};