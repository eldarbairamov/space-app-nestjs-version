import React, { type FC } from "react";

import { NotesItem } from "../Notes-Item/Notes-Item";
import { v4 as uuid } from "uuid";
import { asyncNotesActions } from "../../../../redux/slice";
import { useAppDispatch, useAppSelector } from "../../../../hook";

import style from "./Notes-Sidebar.module.scss";
import add from "../../../../asset/note.png";

export const NotesSidebar: FC = () => {
   const dispatch = useAppDispatch();
   const { notes } = useAppSelector(state => state.notesReducer);

   const addNote = () => {
      dispatch(asyncNotesActions.addNote());
   };

   return (
      <div className={ style.NotesSidebar }>
         <div className={ style.header }>
            <img onClick={ addNote } src={ add } alt={ "add" }/>
         </div>

         <div className={ style.scroll_section }>
            <div className={ style.note_list }>
                  { notes && notes.map(item => <NotesItem key={ uuid() } note={ item }/>) }
            </div>
         </div>
      </div>
   );
};
