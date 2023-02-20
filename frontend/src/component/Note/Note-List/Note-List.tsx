import React, { FC } from "react";

import { NoteItem } from "../Note-Item/Note-Item";
import { v4 as uuid } from "uuid";
import { message } from "antd";
import { useAppSelector } from "../../../hook";
import { Empty } from "antd/lib";
import { getNotesService } from "../../../service";

import style from "./Note-List.module.scss";

export const NoteList: FC = () => {
   const [ messageApi, contextHolder ] = message.useMessage();
   const { notes } = useAppSelector(state => state.noteReducer);
   getNotesService(messageApi);

   return (
      <div className={ style.NoteList }>
         { contextHolder }
         { notes &&
            notes.map(item => <NoteItem key={ uuid() } note={ item }/>)
         }

         { !notes.length &&
            <div className={style.no_notes_wrapper}>
               <Empty image={ Empty.PRESENTED_IMAGE_SIMPLE } description={ "" }/>
            </div>
         }
      </div>
   );
};
