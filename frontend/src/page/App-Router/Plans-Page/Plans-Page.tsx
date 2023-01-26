import React, { type FC, useState } from "react";
import { Toaster } from "react-hot-toast";
import { v4 } from "uuid";

import style from "./Plans-Page.module.scss";
import { PlansItem } from "../../../component/Plans/Plans-Item/Plans-Item";

export interface IPlan {
   id: string
   title: string,
   lastModified: number
}

export const PlansPage: FC = () => {
   const [ plan, setPlan ] = useState<IPlan[]>([]);

   const addPlan = () => {
      const newPlan: IPlan = {
         id: v4(),
         title: "Новий план",
         lastModified: Date.now(),
      };

      setPlan([ ...plan, newPlan ]);
   };

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
               { plan && plan.map(item => <PlansItem plan={ item }/>) }
            </div>

         </div>

      </div>
   );
};
