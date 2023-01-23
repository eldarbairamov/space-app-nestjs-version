import { axiosInstance } from "./axios.service";
import { INoteDto } from "../interface/note.interface";
import { AxiosResponse } from "axios";

const accessToken = localStorage.getItem("accessToken");

export const noteService = {

   addNote: async (): Promise<AxiosResponse<INoteDto>> => {
      return axiosInstance.get<INoteDto>("/notes/initial", {
         headers: {
            "Authorization": `Bearer ${ accessToken }`,
         },
      });

   },

   getNotes: async (): Promise<AxiosResponse<INoteDto[]>> => {
      return axiosInstance.get<INoteDto[]>("/notes", {
         headers: {
            "Authorization": `Bearer ${ accessToken }`,
         },
      });

   },

   saveNote: async (note: Partial<INoteDto>, noteId: string): Promise<AxiosResponse<void>> => {
      return axiosInstance.put<void>(`/notes/${ noteId }`, note, {
         headers: {
            "Authorization": `Bearer ${ accessToken }`,
         },
      });
   },

   deleteNote: async (noteId: string): Promise<AxiosResponse<void>> => {
      return axiosInstance.delete<void>(`/notes/${ noteId }`, {
         headers: {
            "Authorization": `Bearer ${ accessToken }`,
         },
      });
   },

};