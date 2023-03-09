import { useCallback, useRef } from "react";

import { PlanItem } from "@src/component";
import { useAppDispatch, useAppSelector } from "@src/hook";
import { planAction } from "@src/redux/slice";

import style from "./Plan-List.module.scss";
import emptyDark from "@src/asset/empty-dark.svg";
import emptyLight from "@src/asset/empty-light.svg";

export function PlanList() {
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
}
