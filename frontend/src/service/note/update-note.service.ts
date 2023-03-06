import { notesRequests } from "../../config/configuration";
import { INote } from "../../interface";
import { errorCatherFn } from "../../helper/error-catcher";
import { axiosInstance } from "../axios.service";
import { MessageInstance } from "antd/es/message/interface";

export function updateNoteService(messageApi: MessageInstance) {

   const updateNoteFn = async (activeNote: INote) => {
      try {
         const noteToSave = {
            title: activeNote.title,
            body: activeNote.body,
         };
         await axiosInstance.put<void>(notesRequests.saveNote + activeNote.id, noteToSave);

      } catch (e) {
         messageApi.error(errorCatherFn(e));
      }
   };

   return { updateNoteFn };
}