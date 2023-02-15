import React, { FC } from "react";

import { PlanItem } from "../../../component";
import { message } from "antd";
import getPlansService from "../../../service/plan/get-plans.service";
import addPlanService from "../../../service/plan/add-plan.service";
import deletePlanService from "../../../service/plan/delete-plan.service";

import style from "./Plans-Page.module.scss";
import add from "../../../asset/note.png";

export const PlansPage: FC = () => {
   const [ messageApi, contextHolder ] = message.useMessage();

   const { plans, setPlans, setSearchKey, searchKey } = getPlansService(messageApi);
   const { addPlanFn } = addPlanService(setPlans, messageApi);
   const { deletePlanFn } = deletePlanService(plans, setPlans, messageApi);

   const addPlan = async () => addPlanFn();

   const deletePlan = async (e: React.MouseEvent<HTMLParagraphElement>, targetId: string) => {
      e.stopPropagation();
      await deletePlanFn(targetId);
   };

   const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => setSearchKey(e.target.value);

   return (
      <div className={ style.PlansPage }>
         { contextHolder }

         {/* Header */ }
         <div className={ style.header }>

            {/* Add plan */ }
            <img src={ add } alt={ "add" }/>
            <button className={ style.add_plan } onClick={ addPlan }> Додати план</button>

            {/* Search bar */ }
            <div className={ style.search_bar }>
               <input type="text"
                      value={ searchKey }
                      onChange={ (e: React.ChangeEvent<HTMLInputElement>) => handleInput(e) }
                      placeholder={ "Пошук" }
               />
            </div>
         </div>

         {/* Main */ }
         <div className={ style.main }>
            <div className={ style.plan_list }>
               { plans && plans.map(item => <PlanItem key={ item.id } plan={ item } deletePlan={ deletePlan }/>) }
            </div>

         </div>

      </div>
   );
};
