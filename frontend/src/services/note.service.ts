import { axiosInstance, type AxiosRes } from "./axios.service";
import { notesRequests } from "../config/config";
import { NoteDto } from "../dto/intex";

export const noteService = {

   addNote: async () => axiosInstance.get<NoteDto>(notesRequests.addNote),

   getNotes: async () => axiosInstance.get<NoteDto[]>(notesRequests.getNotes),

   getNotesCount: async (): AxiosRes<number> => axiosInstance.get<number>(notesRequests.getNotesCount),

   saveNote: async (note: Partial<NoteDto>, noteId: string): AxiosRes<void> => axiosInstance.put<void>(notesRequests.saveNote + noteId, note),

   deleteNote: async (noteId: string): AxiosRes<void> => axiosInstance.delete<void>(notesRequests.deleteNote + noteId),

   getNotesBySearch: async (searchKey: string) => axiosInstance.get<NoteDto[]>(notesRequests.getNotesBySearch, {
      params: { searchKey },
   }),

};