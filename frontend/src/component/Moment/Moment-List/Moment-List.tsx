import React, { useCallback, useRef } from "react";

import { MomentItem } from "../Moment-Item/Moment-Item";
import { useAppDispatch, useAppSelector } from "../../../hook";
import { momentActions } from "../../../redux/slice";

import style from "./Moment-List.module.scss";
import emptyDark from "../../../asset/empty-dark.svg";
import emptyLight from "../../../asset/empty-light.svg";

export function MomentList() {
   const { moments } = useAppSelector(state => state.momentReducer);
   const { isDark } = useAppSelector(state => state.appReducer);

   const dispatch = useAppDispatch();

   const observer = useRef<any>();
   const lastElemRef = useCallback((node: any) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(([ entry ]) => {
         if (entry.isIntersecting) {
            dispatch(momentActions.next());
         }
      });
      if (node) observer.current.observe(node);
   }, []);

   return (
      <>
         { moments.length
            ?
            <div className={ style.MomentList }>
               { moments && moments.map((moment, index) => {
                  if (moments.length === index + 1) {
                     return <MomentItem ref={ lastElemRef } key={ moment.id } moment={ moment }/>;
                  } else {
                     return <MomentItem key={ moment.id } moment={ moment }/>;
                  }
               })
               }
            </div>
            :
            <div className={ style.no_moments_wrapper }>
               <img src={ isDark ? emptyLight : emptyDark } alt="empty" style={ { width: "80px" } }/>
               <p> Пусто.. </p>
            </div>
         }
      </>
   );
}
