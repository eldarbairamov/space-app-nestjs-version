import { notesRequests } from "../../config/config";
import { useAppDispatch } from "../../hook";
import { INote } from "../../interface";
import { errorCatherFn } from "../../helper/catch-error.helper";
import { axiosInstance } from "../axios.service";
import { noteActions } from "../../redux/slice";
import { MessageInstance } from "antd/es/message/interface";

export function deleteNoteService(messageApi: MessageInstance) {
   const dispatch = useAppDispatch();

   const deleteNoteFn = async (noteId: INote["id"]) => {
      try {
         await axiosInstance.delete<void>(notesRequests.deleteNote + noteId);
         dispatch(noteActions.deleteNote(noteId));

      } catch (e) {
         messageApi.error(errorCatherFn(e));
      }
   };

   return { deleteNoteFn };
}