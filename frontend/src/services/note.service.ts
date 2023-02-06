import { axiosInstance, AxiosRes } from "./axios.service";
import { notesRequests } from "../config/config";
import { INote, IUpdateNote } from "../interface";

export const noteService = {

   addNote: async () => {
      return axiosInstance.get<INote>(notesRequests.addNote);
   },

   getNotes: async () => {
      return axiosInstance.get<INote[]>(notesRequests.getNotes);
   },

   getNotesCount: async (): AxiosRes<number> => {
      return axiosInstance.get<number>(notesRequests.getNotesCount);
   },

   saveNote: async (dto: IUpdateNote, noteId: string): AxiosRes<void> => {
      return axiosInstance.put<void>(notesRequests.saveNote + noteId, dto);
   },

   deleteNote: async (noteId: string): AxiosRes<void> => {
      return axiosInstance.delete<void>(notesRequests.deleteNote + noteId);
   },

   getNotesBySearch: async (searchKey: string) => {
      return axiosInstance.get<INote[]>(notesRequests.getNotesBySearch, {
         params: { searchKey },
      });
   },

};