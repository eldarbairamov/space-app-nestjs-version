import React, { FC } from "react";

import { PlanItem } from "../Plan-Item/Plan-Item";
import { IPlan } from "../../../interface";
import { Empty } from "antd";

import style from "./Plan-List.module.scss";

interface IPlanListProps {
   deletePlanFn: (targetId: string) => Promise<void>;
   plans: IPlan[];
}

export const PlanList: FC<IPlanListProps> = ({ deletePlanFn, plans }) => {
   const deletePlan = async (e: React.MouseEvent<HTMLParagraphElement>, targetId: string) => {
      e.stopPropagation();
      await deletePlanFn(targetId);
   };

   return (
      <div className={ style.PlanList }>
         { plans && plans.map(item => <PlanItem key={ item.id } plan={ item } deletePlan={ deletePlan }/>) }

         {/* No data */}
         { !plans.length &&
            <div className={ style.no_plans_wrapper }>
               <Empty image={ Empty.PRESENTED_IMAGE_SIMPLE } description={ "" }/>
            </div>
         }

      </div>
   );
};
