import React from "react";

import { NoBgInput, NoBgButton } from "../../../component";
import { addNoteService } from "../../../service";
import { message } from "antd";
import { useAppDispatch, useAppSelector } from "../../../hook";
import { TypedOnChange } from "../../../interface/common.interface";
import { noteActions } from "../../../redux/slice";

import add from "../../../asset/note.png";
import style from "./Note-Header.module.scss";

export function NoteHeader() {
   const [ messageApi, contextHolder ] = message.useMessage();

   const { searchKey } = useAppSelector(state => state.noteReducer);

   const dispatch = useAppDispatch();

   const { addNoteFn } = addNoteService(messageApi);

   const handleInput = (event: TypedOnChange) => dispatch(noteActions.setSearchKey(event.target.value));

   return (
      <div className={ style.NoteHeader }>
         { contextHolder }

         {/* Add note */ }
         <img src={ add } alt={ "add" }/>
         <NoBgButton text={ "Додати замітку" } hoverSubject={ "notes" } onClick={ addNoteFn }/>

         {/* Search bar */ }
         <div className={ style.search_bar }>
            <NoBgInput type="text"
                       style={ { fontSize: "15px" } }
                       value={ searchKey }
                       onChange={ handleInput }
                       placeholder={ "Пошук" }
            />
         </div>

      </div>
   );
}
