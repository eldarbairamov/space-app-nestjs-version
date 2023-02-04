import React, { type FC } from "react";
import { useNavigate } from "react-router-dom";
import { dateFormat } from "../../../helper";
import { DeleteOutlined } from "@ant-design/icons";
import { type IPlan } from "../../../interface/plan.interface";

import style from "./Plans-Item.module.scss";
import brain from "../../../asset/brain.png";

interface IPlansItem {
   plan: IPlan;
   deletePlan: (e: React.MouseEvent<HTMLParagraphElement>, targetId: string) => void;
}

export const PlansItem: FC<IPlansItem> = ({ plan, deletePlan }) => {
   const titleCondition = plan && plan.title.split("").length > 16;

   const formatDate = dateFormat(plan.lastModified);

   const navigate = useNavigate();

   const choosePlan = (plan: IPlan) => navigate(`/plans/${ plan.id }`, { state: { plan } });

   return (
      <div className={ style.PlansItem }
           onClick={ () => choosePlan(plan) }
      >

         <p className={ style.plan_name }> { titleCondition ? plan.title.substring(0, 16) + "..." : plan.title }  </p>

         <p className={ style.delete }
            onClick={ (e: React.MouseEvent<HTMLParagraphElement>) => deletePlan(e, plan.id) }><DeleteOutlined
            style={ { fontSize: "20px" } }/></p>

         <img src={ brain } alt="folder"/>

         <p className={ style.plan_date }>
            { formatDate }
         </p>

      </div>
   );
};
