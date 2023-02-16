import React, { FC } from "react";

import { MomentItem } from "../Moment-Item/Moment-Item";
import { useAppSelector } from "../../../hook";
import { Empty } from "antd";

import style from "./Moment-List.module.scss";

export const MomentList: FC = () => {
   const { moments } = useAppSelector(state => state.momentReducer);

   return (
      <div className={ style.MomentList }>
         { moments && moments.map(moment => <MomentItem key={ moment.id } moment={ moment }/>) }

         {/* No data */}
         {!moments.length &&
            <div className={ style.no_moments_wrapper }>
               <Empty image={ Empty.PRESENTED_IMAGE_SIMPLE } description={ "" }/>
            </div>
         }

      </div>
   );
};
