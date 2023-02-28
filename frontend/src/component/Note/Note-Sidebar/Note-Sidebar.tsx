import React, { FC } from "react";

import { message } from "antd";
import { useAppDispatch, useAppSelector } from "../../../hook";
import { noteActions } from "../../../redux/slice";
import { NoteList } from "../Note-List/Note-List";
import { NoBgInput } from "../../UI/No-Bg-Input/No-Bg-Input";
import { addNoteService } from "../../../service";
import { TypedOnChange } from "../../../interface/common.interface";

import style from "./Note-Sidebar.module.scss";
import add from "../../../asset/note.png";

export const NoteSidebar: FC = () => {
   const [ messageApi, contextHolder ] = message.useMessage();
   const {searchKey} = useAppSelector(state => state.noteReducer)

   const dispatch = useAppDispatch();

   const { addNoteFn } = addNoteService(messageApi);

   const handleInput = async (event: TypedOnChange) => {
      dispatch(noteActions.setSearchKey(event.target.value));
   };

   return (
      <div className={ style.NoteSidebar }>
         { contextHolder }

         {/* Header */ }
         <div className={ style.header }>
            <img onClick={ () => addNoteFn() } src={ add } alt={ "add" }/>
         </div>

         {/* Note list */ }
         <div className={ style.middle }>
            <NoteList/>
         </div>

         {/* Search bar */ }
         <div className={ style.bottom }>
            <NoBgInput type="text"
                       value={ searchKey }
                       placeholder={ "Пошук" }
                       onChange={ handleInput }
                       style={ { fontSize: "15px" } }
            />
         </div>

      </div>
   );
};
