import React from "react";

import { NoBgInput, NoBgButton } from "../../../component";
import { addNoteService } from "../../../service";
import { message } from "antd";
import { useAppDispatch, useAppSelector } from "../../../hook";
import { TypedOnChange } from "../../../interface/common.interface";
import { noteActions } from "../../../redux/slice";

import style from "./Note-Header-Adaptive.module.scss";
import addLight from "../../../asset/add-light.svg";
import addDark from "../../../asset/add-dark.svg";

export function NoteHeader() {
   const [ messageApi, contextHolder ] = message.useMessage();

   const { searchKey } = useAppSelector(state => state.noteReducer);
   const { isDark } = useAppSelector(state => state.appReducer);

   const dispatch = useAppDispatch();

   const { addNoteFn } = addNoteService(messageApi);

   const handleInput = (event: TypedOnChange) => dispatch(noteActions.setSearchKey(event.target.value));

   return (
      <div className={ style.NoteHeaderAdaptive }>
         { contextHolder }

         {/* Add note */ }
         <img src={ isDark ? addLight : addDark } alt={ "add" }/>
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
