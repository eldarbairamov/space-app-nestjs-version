import { useEffect } from "react";

import { notesRequests } from "../../config/configuration";
import { useAppDispatch, useAppSelector } from "../../hook";
import { INotes } from "../../interface";
import { errorCatherFn } from "../../helper/error-catcher";
import { axiosInstance } from "../axios.service";
import { noteActions } from "../../redux/slice";
import { MessageInstance } from "antd/es/message/interface";
import { useDebounce } from "../../hook";

export function getNotesService(messageApi: MessageInstance) {
   const { searchKey, total } = useAppSelector(state => state.noteReducer);
   const dispatch = useAppDispatch();

   const debounced = useDebounce(searchKey);

   const getNotesFn = async () => {
      try {
         const { data } = await axiosInstance.get<INotes>(notesRequests.getNotes, {
            params: {
               searchKey: searchKey ? debounced : null,
               limit: total,
            },
         });

         dispatch(noteActions.setNotes(data));

      } catch (e) {
         messageApi.error(errorCatherFn(e));
      }
   };

   useEffect(() => {
      getNotesFn();
   }, [ debounced, total ]);

}