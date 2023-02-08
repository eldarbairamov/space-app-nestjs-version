import React, { FC, useEffect } from "react";

import { momentService } from "../../../services";
import { catchErrors } from "../../../helper";
import { MomentItem } from "../../../component/Moments/Moment-Item/Moment-Item";
import { useAppDispatch, useAppSelector } from "../../../hook";
import { momentActions } from "../../../redux/slice";

import style from "./Moments-Page.module.scss";
import add from "../../../asset/note.png";

export const MomentsPage: FC = () => {
   const { moments } = useAppSelector(state => state.momentReducer);
   const dispatch = useAppDispatch();

   useEffect(() => {
      momentService.getMoments()
         .then(res => dispatch(momentActions.setMoments(res.data)))
         .catch(e => catchErrors(e));
   }, []);

   const addMoment = async () => {
      const { data } = await momentService.addMoment();
      dispatch(momentActions.addMoment(data));
   };

   return (
      <div className={ style.MemoriesPage }>
         <div className={ style.header }>
            <div className={ style.save_moment }>
               <img src={ add } alt={ "add" }/>
               <button onClick={ addMoment }> Зберегти момент</button>
            </div>
         </div>

         <div className={ style.main }>
            <div className={ style.moments_list }>
               { moments && moments.map(moment => <MomentItem key={ moment.id } moment={ moment }/>) }
            </div>
         </div>

      </div>
   );
};
