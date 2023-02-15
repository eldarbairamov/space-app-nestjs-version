import { NoteRepository } from "../../repository";
import { allNotesPresenter } from "../../presenter";
import { INoteResponse } from "../../interface";
import { UserDocument } from "../../model";

export const getNotesService = async (userId: UserDocument["id"], searchKey: string): Promise<INoteResponse[]> => {

   // Find all notes in DB
   const notes = await NoteRepository.find({ ownerId: userId }, searchKey);

   // Return presented data to client
   return allNotesPresenter(notes);

};