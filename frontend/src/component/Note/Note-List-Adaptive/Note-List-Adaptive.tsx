import { v4 as uuid } from "uuid";
import { useAppDispatch, useAppSelector } from "@src/hook";
import { NoteItemAdaptive } from "../Note-Item-Adaptive/Note-Item-Adaptive";
import { useCallback, useRef } from "react";
import { noteActions } from "@src/redux/slice";

import style from "./Note-List-Adaptive.module.scss";
import emptyDark from "@src/asset/empty-dark.svg";
import emptyLight from "@src/asset/empty-light.svg";

export function NoteListAdaptive() {
   const { notes } = useAppSelector(state => state.noteReducer);
   const { isDark } = useAppSelector(state => state.appReducer);

   const dispatch = useAppDispatch();

   const observer = useRef<any>();
   const lastElemRef = useCallback((node: any) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(([ entry ]) => {
         if (entry.isIntersecting) {
            dispatch(noteActions.next());
         }
      });
      if (node) observer.current.observe(node);
   }, []);

   return (
      <>
         { notes.length
            ?
            <div className={ style.NoteListAdaptive }>
               { notes &&
                  notes.map((item, index) => {
                     if (notes.length === index + 1) {
                        return <NoteItemAdaptive ref={ lastElemRef } key={ uuid() } note={ item }/>
                     } else {
                        return <NoteItemAdaptive key={ uuid() } note={ item }/>
                     }
                  })
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
