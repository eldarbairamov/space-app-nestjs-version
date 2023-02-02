import React, { type FC, useState } from "react";

import { NotesItem } from "../Notes-Item/Notes-Item";
import { v4 as uuid } from "uuid";
import { asyncNotesActions, notesActions } from "../../../../redux/slice";
import { useAppDispatch, useAppSelector } from "../../../../hook";

import style from "./Notes-Sidebar.module.scss";
import add from "../../../../asset/note.png";

export const NotesSidebar: FC = () => {
   const dispatch = useAppDispatch();
   const { notes } = useAppSelector(state => state.notesReducer);

   const [ value, setValue ] = useState<string>("");

   const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      dispatch(notesActions.setSearchKey(e.target.value));
      dispatch(asyncNotesActions.getNotesBySearch({ searchKey: e.target.value }));
   };

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

         <div className={ style.search_bar }>
            <input type="text"
                   value={ value }
                   placeholder={ "Пошук" }
                   onChange={ (e: React.ChangeEvent<HTMLInputElement>) => handleInput(e) }/>
         </div>
      </div>
   );
};
