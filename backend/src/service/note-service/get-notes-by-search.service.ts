import { NoteRepository } from "../../repository";
import { allNotesPresenter } from "../../presenter";
import { NoteResponseDto } from "../../dto";

export const getNotesBySearchService = async (searchKey: string, userId: string): Promise<NoteResponseDto[]> => {

   // Search notes by search key
   const notesBySearchKey = await NoteRepository.find({
      title: { $regex: searchKey, $options: "i" },
      ownerId: userId,
   });

   // Return presented data to client
   return allNotesPresenter(notesBySearchKey);

};