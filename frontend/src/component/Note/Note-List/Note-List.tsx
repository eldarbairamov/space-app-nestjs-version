import { FC, useCallback, useRef } from "react";

import { NoteItem } from "@src/component";
import { v4 as uuid } from "uuid";
import { useAppDispatch, useAppSelector } from "@src/hook";
import { noteActions } from "@src/redux/slice";

import style from "./Note-List.module.scss";
import emptyDark from "@src/asset/empty-dark.svg";
import emptyLight from "@src/asset/empty-light.svg";

export const NoteList: FC = () => {
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
            <div className={ style.NoteList }>
               { notes && notes.map((item, index) => {
                  if (notes.length === index + 1) {
                     return <NoteItem ref={ lastElemRef } key={ uuid() } note={ item }/>;
                  } else {
                     return <NoteItem key={ uuid() } note={ item }/>;
                  }
               })
               }
            </div>
            :
            <div className={ style.no_notes_wrapper }>
               <img src={ isDark ? emptyLight : emptyDark } alt="empty" style={ { width: "50px" } }/>
            </div>
         }
      </>
   );
};
