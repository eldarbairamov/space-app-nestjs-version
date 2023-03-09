import { notesRequests } from "@src/config/configuration";
import { useAppDispatch } from "@src/hook";
import { INote } from "@src/interface";
import { errorCatherFn } from "@src/helper/error-catcher";
import { axiosInstance } from "@src/service";
import { noteActions } from "@src/redux/slice";
import { App } from "antd";

export function addNoteService() {
   const dispatch = useAppDispatch();
   const { message } = App.useApp();

   const addNoteFn = async () => {
      try {
         const { data } = await axiosInstance.get<INote>(notesRequests.addNote);
         dispatch(noteActions.addNote(data));
      } catch (e) {
         message.error(errorCatherFn(e));
      }
   };

   return { addNoteFn };
}