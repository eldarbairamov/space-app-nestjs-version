import React, { FC, useState } from "react";

import { message } from "antd";
import { useAppDispatch } from "../../../hook";
import { noteActions } from "../../../redux/slice";
import { NoteList } from "../Note-List/Note-List";
import { NoBgInput } from "../../UI/No-Bg-Input/No-Bg-Input";
import { addNoteService } from "../../../service";

import style from "./Note-Sidebar.module.scss";
import add from "../../../asset/note.png";

export const NoteSidebar: FC = () => {
   const [ messageApi, contextHolder ] = message.useMessage();

   const dispatch = useAppDispatch();

   const { addNoteFn } = addNoteService(messageApi);

   const [ value, setValue ] = useState<string>("");

   const handleInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      dispatch(noteActions.setSearchKey(e.target.value));
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
                       value={ value }
                       placeholder={ "Пошук" }
                       onChange={ handleInput }
                       style={ { fontSize: "15px" } }
            />
         </div>

      </div>
   );
};
