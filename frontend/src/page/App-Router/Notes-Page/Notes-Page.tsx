import React from "react";

import { NoteEdit, NoteSidebar } from "../../../component";
import { useMatchMedia } from "../../../hook";
import { NoteHeader } from "../../../component/Note/Note-Header/Note-Header";
import { NoteListAdaptive } from "../../../component/Note/Note-List-Adaptive/Note-List-Adaptive";

import style from "./Notes-Page.module.scss";

export function NotesPage() {
   const { isWidth1000 } = useMatchMedia();

   return (
      <>
         { !isWidth1000
            ?
            <div className={ style.NotesPage }>
               <div className={ style.left_side }>
                  <NoteSidebar/>
               </div>

               <div className={ style.right_side }>
                  <NoteEdit/>
               </div>
            </div>
            :
            <div className={ style.NotesPageAdaptive }>
               <NoteHeader/>

               <div className={ style.note_list_wrapper }>
                  <NoteListAdaptive/>
               </div>
            </div>
         }

      </>
   );
}
