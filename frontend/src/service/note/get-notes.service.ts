import { useEffect } from "react";

import { notesRequests } from "@src/config/configuration";
import { useAppDispatch, useAppSelector } from "@src/hook";
import { INotes } from "@src/interface";
import { errorCatherFn } from "@src/helper/error-catcher";
import { axiosInstance } from "@src/service";
import { noteActions } from "@src/redux/slice";
import { useDebounce } from "@src/hook";
import { App } from "antd";

export function getNotesService() {
   const { searchKey, total } = useAppSelector(state => state.noteReducer);
   const dispatch = useAppDispatch();
   const { message } = App.useApp();

   const debounced = useDebounce(searchKey);

   const getNotesFn = async () => {
      try {
         dispatch(noteActions.setIsLoading(true))
         const { data } = await axiosInstance.get<INotes>(notesRequests.getNotes, {
            params: {
               searchKey: searchKey ? debounced : null,
               limit: total,
            },
         });

         dispatch(noteActions.setNotes(data));

      } catch (e) {
         dispatch(noteActions.setIsLoading(false))
         message.error(errorCatherFn(e));

      } finally {
         dispatch(noteActions.setIsLoading(false))
      }
   };

   useEffect(() => {
      getNotesFn();
   }, [ debounced, total ]);

}