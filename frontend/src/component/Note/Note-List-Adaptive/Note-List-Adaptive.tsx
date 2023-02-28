import React, { FC } from "react";

import { v4 as uuid } from "uuid";
import { message } from "antd";
import { useAppSelector } from "../../../hook";
import { Empty } from "antd/lib";
import { getNotesService } from "../../../service";
import { NoteItemAdaptive } from "../Note-Item-Adaptive/Note-Item-Adaptive";

import style from "./Note-List-Adaptive.module.scss";

export const NoteListAdaptive: FC = () => {
   const [ messageApi, contextHolder ] = message.useMessage();
   const { notes } = useAppSelector(state => state.noteReducer);
   getNotesService(messageApi);

   return (
      <div className={ style.NoteListAdaptive }>
         { contextHolder }

         { notes &&
            notes.map(item => <NoteItemAdaptive key={ uuid() } note={ item }/>)
         }

         { !notes.length &&
            <div className={ style.no_notes_wrapper }>
               <Empty image={ Empty.PRESENTED_IMAGE_SIMPLE } description={ "" }/>
            </div>
         }
      </div>
   );
};
