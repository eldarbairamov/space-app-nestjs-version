import { INotesResponse } from "@src/interface";
import { UserDocument } from "@src/model";
import { allNotesPresenter } from "@src/presenter";
import { NoteRepository } from "@src/repository";

export const getNotesService = async (userId: UserDocument["id"], searchKey: string, limit: string | number): Promise<INotesResponse> => {

   // Find all notes in DB
   const [ notes, count ] = await Promise.all([
      NoteRepository.find({ ownerId: userId }, searchKey, limit),
      NoteRepository.count({ ownerId: userId }, searchKey),
   ]);

   // Return presented data to client
   return {
      data: allNotesPresenter(notes),
      count,
   };

};