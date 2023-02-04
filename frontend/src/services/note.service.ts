import { axiosInstance, type AxiosRes } from "./axios.service";
import { notesRequests } from "../config/config";
import { GetNoteDto } from "../dto";
import { UpdateNoteDto } from "../dto";

export const noteService = {

   addNote: async () => {
      return axiosInstance.get<GetNoteDto>(notesRequests.addNote);
   },

   getNotes: async () => {
      return axiosInstance.get<GetNoteDto[]>(notesRequests.getNotes);
   },

   getNotesCount: async (): AxiosRes<number> => {
      return axiosInstance.get<number>(notesRequests.getNotesCount);
   },

   saveNote: async (dto: UpdateNoteDto, noteId: string): AxiosRes<void> => {
      return axiosInstance.put<void>(notesRequests.saveNote + noteId, dto);
   },

   deleteNote: async (noteId: string): AxiosRes<void> => {
      return axiosInstance.delete<void>(notesRequests.deleteNote + noteId);
   },

   getNotesBySearch: async (searchKey: string) => {
      return axiosInstance.get<GetNoteDto[]>(notesRequests.getNotesBySearch, {
         params: { searchKey },
      });
   },

};