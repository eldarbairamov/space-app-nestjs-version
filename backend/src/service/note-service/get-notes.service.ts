import { NoteRepository } from "../../repository";
import { allNotesPresenter } from "../../presenter";
import { NoteResponseDto } from "../../dto";

export const getNotesService = async (userId: string): Promise<NoteResponseDto[]> => {

   // Find all notes in DB
   const notes = await NoteRepository.find({ ownerId: userId });

   // Return presented data to client
   return allNotesPresenter(notes);

};