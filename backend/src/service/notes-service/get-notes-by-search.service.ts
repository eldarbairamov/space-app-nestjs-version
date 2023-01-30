import { NoteRepository } from "../../repository";
import { allNotesPresenter } from "../../presenter";
import { type INoteDto } from "../../interface";

export const getNotesBySearchService = async (searchKey: string, userId: string): Promise<INoteDto[]> => {

   // Search notes by search key
   const plansBySearchKey = await NoteRepository.findAll({
      noteOwnerId: userId,
      title: { $regex: searchKey, $options: "i" },
   });

   // Return presented data to client
   return allNotesPresenter(plansBySearchKey);

};