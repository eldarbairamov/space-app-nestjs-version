import { NoteRepository } from "../../repository";
import { allNotesPresenter } from "../../presenter";
import { type INoteResponse } from "../../interface";

export const getNotesService = async (userId: string): Promise<INoteResponse[]> => {

   // Find all notes in DB
   const notes = await NoteRepository.find({ ownerId: userId });

   // Return presented data to client
   return allNotesPresenter(notes);

};