import { v4 as uuid } from "uuid";
import { useAppSelector } from "@src/hook";
import { getNotesService } from "@src/service";
import { NoteItemAdaptive } from "../Note-Item-Adaptive/Note-Item-Adaptive";

import style from "./Note-List-Adaptive.module.scss";
import emptyDark from "@src/asset/empty-dark.svg";
import emptyLight from "@src/asset/empty-light.svg";

export function NoteListAdaptive() {
   const { notes } = useAppSelector(state => state.noteReducer);
   const { isDark } = useAppSelector(state => state.appReducer);

   getNotesService();

   return (
      <>
         { notes.length
            ?
            <div className={ style.NoteListAdaptive }>
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
}
