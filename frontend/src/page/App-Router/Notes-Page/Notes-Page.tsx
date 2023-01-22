import React, { type FC } from "react";

import { NotesMain } from "../../../component/Notes/Notes-Main/Notes-Main";
import { NotesSidebar } from "../../../component/Notes/Sidebar/Notes-Sidebar/Notes-Sidebar";

import style from "./Notes-Page.module.scss";

export const NotesPage: FC = () => {

   return (
      <div className={ style.NotesPage }>

         <div className={ style.left_side }>
            <NotesSidebar/>
         </div>

         <div className={ style.right_side }>
            <NotesMain/>
         </div>

      </div>
   );
};
