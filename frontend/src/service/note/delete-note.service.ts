import { notesRequests } from "@src/config/configuration";
import { useAppDispatch } from "@src/hook";
import { INote, INotes } from "@src/interface";
import { errorCatherFn } from "@src/helper/error-catcher";
import { axiosInstance } from "@src/service";
import { noteActions } from "@src/redux/slice";
import { App } from "antd";

export function deleteNoteService() {
   const dispatch = useAppDispatch();
   const { message } = App.useApp();

   const deleteNoteFn = async (noteId: INote["id"], total = 30, searchKey = "") => {
      try {
         const { data } = await axiosInstance.post<INotes>(notesRequests.deleteNote + noteId, {
            limit: total,
            searchKey: searchKey ? searchKey : null,
         });
         dispatch(noteActions.deleteNote(noteId));
         dispatch(noteActions.setNotes(data));
      } catch (e) {
         message.error(errorCatherFn(e));
      }
   };

   return { deleteNoteFn };
}