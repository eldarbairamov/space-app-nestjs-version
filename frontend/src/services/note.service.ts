import { axiosInstance, type AxiosRes } from "./axios.service";
import { type INoteDto } from "../interface";
import { notesRequests } from "../config/config";

export const noteService = {

   addNote: async () => axiosInstance.get<INoteDto>(notesRequests.addNote),

   getNotes: async () => axiosInstance.get<INoteDto[]>(notesRequests.getNotes),

   getNotesCount: async (): AxiosRes<number> => axiosInstance.get<number>(notesRequests.getNotesCount),

   saveNote: async (note: Partial<INoteDto>, noteId: string): AxiosRes<void> => axiosInstance.put<void>(notesRequests.saveNote + noteId, note),

   deleteNote: async (noteId: string): AxiosRes<void> => axiosInstance.delete<void>(notesRequests.deleteNote + noteId),

   getNotesBySearch: async (searchKey: string) => axiosInstance.get<INoteDto[]>(notesRequests.getNotesBySearch, {
      params: { searchKey },
   }),

};