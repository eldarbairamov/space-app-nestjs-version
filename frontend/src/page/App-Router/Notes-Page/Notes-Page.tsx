import React, { type FC, useRef, useState } from "react";

import { NotesSidebar } from "../../../component/Notes/Notes-Sidebar/Notes-Sidebar";
import { NotesMain } from "../../../component/Notes/Notes-Main/Notes-Main";
import { INote } from "../../../interface/note.interface";

import style from "./Notes-Page.module.scss";

export const NotesPage: FC = () => {
   const [ notes, setNotes ] = useState<INote[]>([]);

   const addNote = () => {
      const newNote = {
         id: Date.now(),
         title: "Нова замітка",
         last_modified: Date.now(),
      };

      setNotes([ ...notes, newNote ]);
   };

   return (
      <div className={ style.NotesPage }>

         <div className={ style.left_side }>
            <NotesSidebar addNote={ addNote } notes={ notes }/>
         </div>

         <div className={ style.right_side }>
            <NotesMain/>
         </div>

      </div>
   );
};
