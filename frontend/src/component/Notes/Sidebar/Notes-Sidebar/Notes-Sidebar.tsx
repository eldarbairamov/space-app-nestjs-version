import React, { type FC, useEffect } from "react";

import { NotesItem } from "../Notes-Item/Notes-Item";
import { v4 as uuid } from "uuid";
import { notesActions } from "../../../../redux/slice/notes.slice";
import { useAppDispatch, useAppSelector } from "../../../../hook/redux.hook";

import style from "./Notes-Sidebar.module.scss";


export const NotesSidebar: FC = () => {
   const dispatch = useAppDispatch();
   const { notes } = useAppSelector(state => state.notesReducer);

   const addNote = (): void => {
      const newNote = {
         id: Date.now(),
         body: "",
         title: "Нова замітка",
         last_modified: Date.now(),
      };

      dispatch(notesActions.addNote(newNote));
   };

   useEffect(() => {

   }, [])


   return (
      <div className={ style.NotesSidebar }>
         <div className={ style.header }>
            <p onClick={ addNote }> Додати </p>
         </div>

         <div className={ style.scroll_section }>
            <div className={ style.note_list }>

               { notes && notes.map(item => <NotesItem key={ uuid() } note={ item }/>) }

            </div>
         </div>
      </div>
   );
};
