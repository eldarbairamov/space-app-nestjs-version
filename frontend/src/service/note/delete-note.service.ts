import { notesRequests } from "../../config/configuration";
import { useAppDispatch } from "../../hook";
import { INote, INotes } from "../../interface";
import { errorCatherFn } from "../../helper/error-catcher";
import { axiosInstance } from "../axios.service";
import { noteActions } from "../../redux/slice";
import { MessageInstance } from "antd/es/message/interface";

export function deleteNoteService(messageApi: MessageInstance) {
   const dispatch = useAppDispatch();

   const deleteNoteFn = async (noteId: INote["id"], total: number, searchKey: string) => {
      try {
         const { data } = await axiosInstance.post<INotes>(notesRequests.deleteNote + noteId, {
            limit: total,
            searchKey,
         });
         dispatch(noteActions.deleteNote(noteId));
         dispatch(noteActions.setNotes(data));
      } catch (e) {
         messageApi.error(errorCatherFn(e));
      }
   };

   return { deleteNoteFn };
}