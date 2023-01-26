import React, { type FC } from "react";
import { type IPlan } from "../../../page";
import { useNavigate } from "react-router-dom";
import { dateFormat } from "../../../helper";

import style from "./Plans-Item.module.scss";
import brain from "../../../asset/brain.png";

interface IPlansItem {
   plan: IPlan;
}

export const PlansItem: FC<IPlansItem> = ({ plan }) => {

   const formatDate = dateFormat(plan.lastModified);

   const navigate = useNavigate();

   const choosePlan = (plan: IPlan) => navigate(`/plans/${ plan.id }`, { state: { plan } });

   return (
      <div className={ style.PlansItem } onClick={ () => choosePlan(plan) }>

         <p className={ style.plan_name }> { plan.title }  </p>

         <img src={ brain } alt="folder"/>

         <p className={ style.plan_date }>
            { formatDate }
         </p>

      </div>
   );
};
