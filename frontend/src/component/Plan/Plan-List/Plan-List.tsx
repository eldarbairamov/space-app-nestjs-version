import React, { FC, useCallback, useRef } from "react";

import { PlanItem } from "../Plan-Item/Plan-Item";
import { useAppDispatch, useAppSelector } from "../../../hook";
import { planAction } from "../../../redux/slice";

import style from "./Plan-List.module.scss";
import emptyDark from "../../../asset/empty-dark.svg";
import emptyLight from "../../../asset/empty-light.svg";

export const PlanList: FC = () => {
   const { plans } = useAppSelector(state => state.planReducer);
   const { isDark } = useAppSelector(state => state.appReducer);

   const dispatch = useAppDispatch();

   const observer = useRef<any>();
   const lastElemRef = useCallback((node: any) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(([ entry ]) => {
         if (entry.isIntersecting) {
            dispatch(planAction.next());
         }
      });
      if (node) observer.current.observe(node);
   }, []);

   return (
      <>
         { plans.length
            ?
            <div className={ style.PlanList }>
               { plans && plans.map((item, index) => {
                  if (plans.length == index + 1) {
                     return <PlanItem ref={ lastElemRef } key={ item.id } plan={ item }/>;
                  } else {
                     return <PlanItem key={ item.id } plan={ item }/>;
                  }
               }) }
            </div>
            :
            <div className={ style.no_plans_wrapper }>
               <img src={ isDark ? emptyLight : emptyDark } alt="empty" style={ { width: "80px" } }/>
               <p> Пусто.. </p>
            </div>
         }
      </>
   );
};
