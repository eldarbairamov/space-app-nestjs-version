import React, { FC } from "react";

import { NoteEdit, NoteSidebar } from "../../../component";

import style from "./Notes-Page.module.scss";

export const NotesPage: FC = () => {
   return (
      <div className={ style.NotesPage }>

         <div className={ style.left_side }>
            <NoteSidebar />
         </div>

         <div className={ style.right_side }>
            <NoteEdit/>
         </div>

      </div>
   );
};
