import React, { type FC, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { PlansItem } from "../../../component/Plans/Plans-Item/Plans-Item";
import { planService } from "../../../services";
import { type IPlanDto } from "../../../interface";

import style from "./Plans-Page.module.scss";

export const PlansPage: FC = () => {
   const [ plans, setPlans ] = useState<IPlanDto[]>([]);

   const addPlan = async () => {
      const { data } = await planService.addPlan();
      setPlans([ ...plans, data ]
         .sort((a, b) => b.lastModified - a.lastModified));
   };

   const deletePlan = async (e: React.MouseEvent<HTMLParagraphElement>, targetId: string): Promise<void> => {
      e.stopPropagation();
      const updatedArr = plans.filter(item => item.id !== targetId);
      await planService.deletePlan(targetId);

      setPlans(updatedArr);
   };

   useEffect(() => {
      planService.getAllPlans()
         .then(res => setPlans(res.data));
   }, []);

   return (
      <div className={ style.PlansPage }>

         {/* Toaster */ }
         <Toaster
            toastOptions={ {
               error: {
                  style: {
                     textAlign: "center",
                  },
                  iconTheme: {
                     primary: "#df8281",
                     secondary: "white",
                  },
               },
               success: {
                  style: {
                     textAlign: "center",
                  },
                  iconTheme: {
                     primary: "#84df81",
                     secondary: "white",
                  },
               },
            } }
         />

         <div className={ style.top }>
            <button className={ style.header }> +</button>
            <button className={ style.header } onClick={ addPlan }> Додати план</button>
         </div>

         <div className={ style.bottom }>

            <div className={ style.plan_list }>
                  { plans && plans.map(item => <PlansItem key={ item.id } plan={ item } deletePlan={ deletePlan }/>) }
            </div>

         </div>

      </div>
   );
};
