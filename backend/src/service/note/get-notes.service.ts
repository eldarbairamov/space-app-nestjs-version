import { NoteRepository } from "../../repository";
import { allNotesPresenter } from "../../presenter";
import { INotesResponse, IQuery } from "../../interface";
import { UserDocument } from "../../model";

export const getNotesService = async (userId: UserDocument["id"], query: IQuery): Promise<INotesResponse> => {

   // Find all notes in DB and count
   const [ notes, count ] = await Promise.all([
      NoteRepository.find({ ownerId: userId }, query),
      NoteRepository.count(userId, query.searchKey),
   ]);

   // Find values
   const page = +query.page ? +query.page : 1
   const perPage = count < 20 ? count : (+query.limit ? +query.limit : 20);
   const totalPages = Math.ceil(count / perPage);
   const hasNextPage = +query.page < +totalPages;
   const hasPrevPage = page !== 1;

   // Return presented data to client
   const presentedNotes = allNotesPresenter(notes);
   return { data: presentedNotes, count, page: +query.page ? +query.page : 1, totalPages, perPage, hasNextPage, hasPrevPage };

};