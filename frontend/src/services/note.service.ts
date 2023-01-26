import { axiosInstance, type AxiosRes } from "./axios.service";
import { type INoteDto } from "../interface";

export const noteService = {

   addNote: async (): AxiosRes<INoteDto> => axiosInstance.get<INoteDto>("/notes/add"),

   getNotes: async (): AxiosRes<INoteDto[]> => axiosInstance.get<INoteDto[]>("/notes"),

   getNotesCount: async (): AxiosRes<number> => axiosInstance.get<number>("/notes/count"),

   saveNote: async (note: Partial<INoteDto>, noteId: string): AxiosRes<void> => axiosInstance.put<void>(`/notes/${ noteId }`, note),

   deleteNote: async (noteId: string): AxiosRes<void> => axiosInstance.delete<void>(`/notes/${ noteId }`),

};