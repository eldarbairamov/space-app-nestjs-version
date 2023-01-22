import React, { type FC } from "react";

import { INote } from "../../../interface/note.interface";

import style from './Notes-Sidebar.module.scss'

interface INotesSidebar {
   addNote: () => void,
   notes: INote[]
}

export const NotesSidebar: FC<INotesSidebar> = ({addNote, notes}) => {

   return (
      <div className={style.NotesSidebar}>
         <div className={ style.header }>
            <p onClick={ addNote }> Додати </p>
         </div>

         <div className={ style.scroll_section }>
            <div className={ style.note_list }>
               { notes && notes.map(item =>
                  <div className={ style.note_item } key={ item.id }>
                     <h4> { item.title } </h4>
                  </div>)
               }
            </div>
         </div>
      </div>
   );
};
