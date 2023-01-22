import React, { type FC } from "react";

import { type INote } from "../../../../interface/note.interface";
import { NotesItem } from "../Notes-Item/Notes-Item";
import { v4 as uuid } from "uuid";

import style from "./Notes-Sidebar.module.scss";

interface INotesSidebar {
   addNote: () => void,
   notes: INote[]
   setActiveNoteId: React.Dispatch<React.SetStateAction<number | undefined>>
   activeNoteId: number | undefined
}

export const NotesSidebar: FC<INotesSidebar> = ({ addNote, notes, setActiveNoteId, activeNoteId }) => {

   return (
      <div className={ style.NotesSidebar }>
         <div className={ style.header }>
            <p onClick={ addNote }> Додати </p>
         </div>

         <div className={ style.scroll_section }>
            <div className={ style.note_list }>

               { notes && notes.map(item =>
                  <NotesItem key={ uuid() }
                             note={ item }
                             setActiveNoteId={ setActiveNoteId }
                             activeNoteId={ activeNoteId }/>) }

            </div>
         </div>
      </div>
   );
};
