import { NoteRepository } from "../../repository";
import { allNotesPresenter } from "../../presenter";
import { type INoteDto } from "../../interface";

export const getNotesBySearchService = async (searchKey: string, userId: string): Promise<INoteDto[]> => {

   // Search notes by search key
   const notesBySearchKey = await NoteRepository.find({
      title: { $regex: searchKey, $options: "i" },
      ownerId: userId,
   });

   // Return presented data to client
   return allNotesPresenter(notesBySearchKey);

};