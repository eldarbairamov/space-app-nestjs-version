import { notesRequests } from "../../config/config";
import { useAppDispatch } from "../../hook";
import { INote } from "../../interface";
import { errorCatherFn } from "../../helper/catch-error.helper";
import { axiosInstance } from "../axios.service";
import { noteActions } from "../../redux/slice";
import { MessageInstance } from "antd/es/message/interface";

export function addNoteService(messageApi: MessageInstance) {
   const dispatch = useAppDispatch();

   const addNoteFn = async () => {
      try {
         const { data } = await axiosInstance.get<INote>(notesRequests.addNote);
         dispatch(noteActions.addNote(data));
      } catch (e) {
         messageApi.error(errorCatherFn(e));
      }
   };

   return { addNoteFn };
}