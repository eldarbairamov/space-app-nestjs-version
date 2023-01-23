import { axiosInstance } from "./axios.service";
import { INoteDto } from "../interface/note.interface";

export const noteService = {

   addNote: async () => {
      const accessToken = localStorage.getItem("accessToken");

      return axiosInstance.get<INoteDto>("/notes/initial", {
         headers: {
            "Authorization": `Bearer ${ accessToken }`,
         },
      });
   },

   getNotes: async () => {
      const accessToken = localStorage.getItem("accessToken");

      return axiosInstance.get<INoteDto[]>("/notes", {
         headers: {
            "Authorization": `Bearer ${ accessToken }`,
         },
      });
   }
};