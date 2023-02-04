import { NoteRepository } from "../../repository";
import { allNotesPresenter } from "../../presenter";
import { NoteDto } from "../../dto";

export const getNotesService = async (userId: string): Promise<NoteDto[]> => {

   // Find all notes in DB
   const notes = await NoteRepository.find({ ownerId: userId });

   // Return presented data to client
   return allNotesPresenter(notes);

};