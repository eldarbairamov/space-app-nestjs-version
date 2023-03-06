import React, { FC } from "react";

import { v4 as uuid } from "uuid";
import { message } from "antd";
import { useAppSelector } from "../../../hook";
import { getNotesService } from "../../../service";
import { NoteItemAdaptive } from "../Note-Item-Adaptive/Note-Item-Adaptive";

import style from "./Note-List-Adaptive.module.scss";
import emptyDark from "../../../asset/empty-dark.svg";
import emptyLight from "../../../asset/empty-light.svg";

export const NoteListAdaptive: FC = () => {
   const [ messageApi, contextHolder ] = message.useMessage();

   const { notes } = useAppSelector(state => state.noteReducer);
   const { isDark } = useAppSelector(state => state.appReducer);

   getNotesService(messageApi);

   return (
      <>
         { notes.length
            ?
            <div className={ style.NoteListAdaptive }>
               { contextHolder }

               { notes &&
                  notes.map(item => <NoteItemAdaptive key={ uuid() } note={ item }/>)
               }
            </div>
            :
            <div className={ style.no_notes_wrapper }>
               <img src={ isDark ? emptyLight : emptyDark } alt="empty" style={ { width: "80px" } }/>
               <p> Пусто.. </p>
            </div>
         }
      </>
   );
};
