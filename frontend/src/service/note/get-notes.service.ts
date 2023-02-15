import { notesRequests } from "../../config/config";
import { useAppDispatch, useAppSelector } from "../../hook";
import { INote } from "../../interface";
import { errorCatherFn } from "../../helper/catch-error.helper";
import { axiosInstance } from "../axios.service";
import { noteActions } from "../../redux/slice";
import { useEffect } from "react";
import { MessageInstance } from "antd/es/message/interface";

export default function getNotesService(messageApi: MessageInstance) {
   const { searchKey } = useAppSelector(state => state.notesReducer);
   const dispatch = useAppDispatch();

   const getNotesFn = async () => {
      try {
         const { data } = await axiosInstance.get<INote[]>(notesRequests.getNotes, { params: { searchKey: searchKey || null } });
         dispatch(noteActions.setNotes(data));
      } catch (e) {
         messageApi.error(errorCatherFn(e));
      }
   };

   useEffect(() => {
      getNotesFn();
   }, [ searchKey ]);

}