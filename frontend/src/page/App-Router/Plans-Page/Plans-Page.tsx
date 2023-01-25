import React, { type FC, useState } from "react";
import { Toaster } from "react-hot-toast";
import { v4 } from "uuid";
import brain from "../../../asset/brain.png";
import { useNavigate } from "react-router-dom";

import style from "./Plans-Page.module.scss";

export interface IPlan {
   id: string
   sectionName: string,
   lastModified: number
}

export const PlansPage: FC = () => {
   const [ plan, setPlan ] = useState<IPlan[]>([]);

   const navigate = useNavigate();

   const addPlan = () => {
      const newPlan: IPlan = {
         id: v4(),
         sectionName: "Новий план",
         lastModified: Date.now(),
      };

      setPlan([ ...plan, newPlan ]);
   };

   const choosePlan = (planId: string, item: IPlan) => {
      navigate(`/plans/${ planId }`, { state: { plan: item } });
   }

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
            <button className={style.header}> + </button>
            <button className={ style.header } onClick={ addPlan }> Додати план </button>
         </div>

         <div className={ style.bottom }>

            <div className={ style.plan_list }>
               { plan && plan.map(item => (

                  <div key={ item.id } className={ style.plans_item } onClick={ () => choosePlan(item.id, item) }>

                     <p className={ style.plan_name }> { item.sectionName }  </p>

                     <img src={ brain } alt="folder"/>

                     <p className={ style.plan_date }>
                        { new Date(item.lastModified).toLocaleDateString("en-GB", {
                           hour: "2-digit",
                           minute: "2-digit",
                        }) }
                     </p>

                  </div>

               )) }
            </div>

         </div>

      </div>
   );
};
