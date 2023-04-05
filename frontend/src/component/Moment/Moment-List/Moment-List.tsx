import { MomentItem } from "@src/component";
import { useAppDispatch, useAppSelector } from "@src/hook";
import { momentActions } from "@src/redux/slice";
import { useObserver } from "@src/hook/use-observer";

import style from "./Moment-List.module.scss";
import emptyDark from "/empty-dark.svg";
import emptyLight from "/empty-light.svg";

export function MomentList() {
   const { moments } = useAppSelector(state => state.momentReducer);
   const { isDark } = useAppSelector(state => state.appReducer);

   const dispatch = useAppDispatch();

   const { lastElemRef } = useObserver(() => dispatch(momentActions.next()))

   return (
      <div className={ style.MomentList }>
         { !!moments.length &&
            <div className={ style.list }>
               { moments && moments.map((moment, index) => {
                  if (moments.length === index + 1) {
                     return <MomentItem ref={ lastElemRef }
                                        key={ moment.id }
                                        moment={ moment }/>;
                  } else {
                     return <MomentItem key={ moment.id }
                                        moment={ moment }/>;
                  }
               })
               }
            </div>
         }

         { !moments.length &&
            <div className={ style.no_moments_wrapper }>
               <img src={ isDark ? emptyLight : emptyDark }
                    alt="empty"
                    style={ { width: "80px" } }/>
               <p> Пусто.. </p>
            </div>
         }
      </div>
   );
}
