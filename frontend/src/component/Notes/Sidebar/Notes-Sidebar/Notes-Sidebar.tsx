import React, { type FC, useState } from "react";

import { NotesItem } from "../Notes-Item/Notes-Item";
import { v4 as uuid } from "uuid";
import { notesActions } from "../../../../redux/slice";
import { useAppDispatch, useAppSelector } from "../../../../hook";
import { noteService } from "../../../../services";
import { catchErrors } from "../../../../helper";

import style from "./Notes-Sidebar.module.scss";
import add from "../../../../asset/note.png";

export const NotesSidebar: FC = () => {
   const dispatch = useAppDispatch();

   const { notes } = useAppSelector(state => state.notesReducer);

   const [ value, setValue ] = useState<string>("");

   const handleInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
      try {
         setValue(e.target.value);

         dispatch(notesActions.setSearchKey(e.target.value));

         const { data } = await noteService.getNotesBySearch(e.target.value);

         dispatch(notesActions.getNotesBySearch(data));

      } catch (e) {
         catchErrors(e);
      }
   };

   const addNote = () => {
      noteService
         .addNote()
         .then(res => dispatch(notesActions.addNote(res.data)))
         .catch(e => catchErrors(e));
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
