import { useEffect, useState } from "react";
import { noteActions } from "@src/redux/slice";
import { axiosInstance } from "@src/service";
import { INote } from "@src/interface";
import { notesRequests } from "@src/config/configuration";
import { errorCatherFn } from "@src/helper";
import { useAppDispatch } from "@src/hook";
import { App } from "antd";

export function getNoteService(noteId: string) {
   const dispatch = useAppDispatch();
   const { message } = App.useApp();

   const [note, setNote] = useState<INote>()

   const getNoteFn = async () => {
      try {
         dispatch(noteActions.setIsLoading(true))
         const { data } = await axiosInstance.get<INote>(notesRequests.getNote + noteId)
         dispatch(noteActions.setActiveNote(data))
         setNote(data)

      } catch (e) {
         dispatch(noteActions.setIsLoading(false))
         message.error(errorCatherFn(e));

      } finally {
         dispatch(noteActions.setIsLoading(false))
      }
   }

   useEffect(() => {
      getNoteFn()
   }, [])

   return {note}

}
