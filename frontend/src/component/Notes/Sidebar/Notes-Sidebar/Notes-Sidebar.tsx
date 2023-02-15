import React, { FC, useState } from "react";

import { NoteItem } from "../Note-Item/Note-Item";
import { v4 as uuid } from "uuid";
import { noteActions } from "../../../../redux/slice";
import { useAppDispatch, useAppSelector } from "../../../../hook";
import addNoteService from "../../../../service/note/add-note.service";
import { message } from "antd";

import style from "./Notes-Sidebar.module.scss";
import add from "../../../../asset/note.png";

export const NotesSidebar: FC = () => {
   const [ messageApi, contextHolder ] = message.useMessage();

   const dispatch = useAppDispatch();

   const { addNoteFn } = addNoteService(messageApi);

   const { notes } = useAppSelector(state => state.notesReducer);

   const [ value, setValue ] = useState<string>("");

   const handleInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      dispatch(noteActions.setSearchKey(e.target.value));
   };

   const addNote = async () => addNoteFn();

   return (
      <div className={ style.NotesSidebar }>
         { contextHolder }

         {/* Header */ }
         <div className={ style.header }>
            <img onClick={ addNote } src={ add } alt={ "add" }/>
         </div>

         {/* Note list */ }
         <div className={ style.scroll_section }>
            <div className={ style.note_list }>
               { notes && notes.map(item => <NoteItem key={ uuid() } note={ item }/>) }
            </div>
         </div>

         {/* Search bar */ }
         <div className={ style.search_bar }>
            <input type="text"
                   value={ value }
                   placeholder={ "Пошук" }
                   onChange={ handleInput }/>
         </div>
      </div>
   );
};
