import { axiosInstance, AxiosRes } from "./axios.service";
import { notesRequests } from "../config/config";
import { INote, INotes, IUpdateNote } from "../interface";
import { IQuery } from "../interface/common.interface";

export const noteService = {

   addNote: async () => {
      return axiosInstance.get<INote>(notesRequests.addNote);
   },

   getNotes: async (query: IQuery) => {
      const { limit = 20, page = 1, searchKey = null } = query;
      return axiosInstance.get<INotes>(notesRequests.getNotes, { params: { limit, page, searchKey } });
   },

   getNotesCount: async (): AxiosRes<number> => {
      return axiosInstance.get<number>(notesRequests.getNotesCount);
   },

   saveNote: async (body: IUpdateNote, noteId: INote["id"]): AxiosRes<void> => {
      return axiosInstance.put<void>(notesRequests.saveNote + noteId, body);
   },

   deleteNote: async (noteId: INote["id"]): AxiosRes<void> => {
      return axiosInstance.delete<void>(notesRequests.deleteNote + noteId);
   },

};