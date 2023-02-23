import React, { FC } from "react";

import { PlanItem } from "../Plan-Item/Plan-Item";
import { Empty } from "antd";
import { useAppSelector } from "../../../hook";

import style from "./Plan-List.module.scss";

export const PlanList: FC = () => {
   const { plans } = useAppSelector(state => state.planReducer);

   return (
      <div className={ style.PlanList }>

         { plans && plans.map(item => <PlanItem key={ item.id } plan={ item }/>) }

         {/* No data */ }
         { (!plans.length) &&
            <div className={ style.no_plans_wrapper }>
               <Empty image={ Empty.PRESENTED_IMAGE_SIMPLE } description={ "" }/>
            </div>
         }

      </div>
   );
};
