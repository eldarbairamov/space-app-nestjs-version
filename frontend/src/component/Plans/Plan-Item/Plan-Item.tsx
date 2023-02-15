import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { dateFormat } from "../../../helper";
import { DeleteOutlined } from "@ant-design/icons";
import { IPlan } from "../../../interface";

import style from "./Plan-Item.module.scss";
import brain from "../../../asset/brain.png";

interface IPlanItem {
   plan: IPlan;
   deletePlan: (e: React.MouseEvent<HTMLParagraphElement>, targetId: string) => void;
}

export const PlanItem: FC<IPlanItem> = ({ plan, deletePlan }) => {
   const titleCondition = plan && plan.title.split("").length > 16;

   const formatDate = dateFormat(plan.lastModified);

   const navigate = useNavigate();

   const choosePlan = (plan: IPlan) => navigate(`/plans/${ plan.id }`, { state: { plan } });

   return (
      <div className={ style.PlanItem }
           onClick={ () => choosePlan(plan) }>

         <p className={ style.plan_name }> { titleCondition ? plan.title.substring(0, 16) + "..." : plan.title }  </p>

         <p className={ style.delete }
            onClick={ event => deletePlan(event, plan.id) }><DeleteOutlined
            style={ { fontSize: "20px" } }/></p>

         <img src={ brain } alt="folder"/>

         <p className={ style.plan_date }>
            { formatDate }
         </p>

      </div>
   );
};
