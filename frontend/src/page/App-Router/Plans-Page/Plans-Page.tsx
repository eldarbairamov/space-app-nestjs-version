import React, { FC, useState } from "react";

import { PlanItem } from "../../../component";
import { planService } from "../../../services";
import { catchErrors } from "../../../helper";
import { IPlan } from "../../../interface";
import { useQuery } from "@tanstack/react-query";
import { ToasterWithOptions } from "../../../component/UI/Toaster-With-Options/Toaster-With-Options";

import style from "./Plans-Page.module.scss";

export const PlansPage: FC = () => {
   const [ plans, setPlans ] = useState<IPlan[]>([]);
   const [ searchKey, setSearchKey ] = useState<string>("");

   useQuery({
      queryKey: [ "plan list", searchKey ],
      queryFn: () => planService.getPlans(searchKey),
      onSuccess: ({ data }) => setPlans(data.data),
      onError: (err) => catchErrors(err),
   });

   const addPlan = async () => {
      try {
         const { data } = await planService.addPlan();
         setPlans([ ...plans, data ].sort((a, b) => b.lastModified - a.lastModified));
      } catch (e) {
         catchErrors(e);
      }
   };

   const deletePlan = async (e: React.MouseEvent<HTMLParagraphElement>, targetId: string): Promise<void> => {
      try {
         e.stopPropagation();
         const updatedArr = plans.filter(item => item.id !== targetId);
         await planService.deletePlan(targetId);
         setPlans(updatedArr);
      } catch (e) {
         catchErrors(e);
      }
   };

   const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => setSearchKey(e.target.value);

   return (
      <div className={ style.PlansPage }>

         {/* Toaster */ }
         <ToasterWithOptions/>

         {/* Header */ }
         <div className={ style.header }>

            {/* Add plan */ }
            <button className={ style.add_plan }> +</button>
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
