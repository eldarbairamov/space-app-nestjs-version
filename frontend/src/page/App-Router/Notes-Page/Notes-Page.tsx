import React, { FC } from "react";

import { NotesMain, NotesSidebar } from "../../../component";
import { message } from "antd";
import getNotesService from "../../../service/note/get-notes.service";

import style from "./Notes-Page.module.scss";

export const NotesPage: FC = () => {
   const [ messageApi, contextHolder ] = message.useMessage();

   getNotesService(messageApi);

   return (
      <div className={ style.NotesPage }>
         { contextHolder }

         <div className={ style.left_side }>
            <NotesSidebar/>
         </div>

         <div className={ style.right_side }>
            <NotesMain/>
         </div>

      </div>
   );
};
