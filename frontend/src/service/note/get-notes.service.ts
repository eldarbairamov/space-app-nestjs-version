import { useEffect } from "react";

import { notesRequests } from "../../config/config";
import { useAppDispatch, useAppSelector } from "../../hook";
import { INote } from "../../interface";
import { errorCatherFn } from "../../helper/error-catcher";
import { axiosInstance } from "../axios.service";
import { noteActions } from "../../redux/slice";
import { MessageInstance } from "antd/es/message/interface";
import { useDebounce } from "../../hook";

export function getNotesService(messageApi: MessageInstance) {
   const { searchKey } = useAppSelector(state => state.noteReducer);
   const debounced = useDebounce(searchKey);

   const dispatch = useAppDispatch();

   const getNotesFn = async () => {
      try {
         const { data } = await axiosInstance.get<INote[]>(notesRequests.getNotes, { params: { searchKey: debounced || null } });
         dispatch(noteActions.setNotes(data));
      } catch (e) {
         messageApi.error(errorCatherFn(e));
      }
   };

   useEffect(() => {
      getNotesFn();
   }, [ debounced ]);

}