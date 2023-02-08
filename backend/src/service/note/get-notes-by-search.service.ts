import { NoteRepository } from "../../repository";
import { allNotesPresenter } from "../../presenter";
import { INoteResponse } from "../../interface";
import { UserDocument } from "../../model";

export const getNotesBySearchService = async (searchKey: string, userId: UserDocument["id"]): Promise<INoteResponse[]> => {

   // Search notes by search key
   const notesBySearchKey = await NoteRepository.find({
      title: { $regex: searchKey, $options: "i" },
      ownerId: userId,
   });

   // Return presented data to client
   return allNotesPresenter(notesBySearchKey);

};