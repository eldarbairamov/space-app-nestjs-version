import React, { FC, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { PlansItem } from "../../../component";
import { planService } from "../../../services";
import { catchErrors } from "../../../helper";
import { IPlan } from "../../../interface";

import style from "./Plans-Page.module.scss";

export const PlansPage: FC = () => {
   const [ plans, setPlans ] = useState<IPlan[]>([]);

   const [ searchKey, setSearchKey ] = useState<string>("");

   const addPlan = async () => {
      try {
         const { data } = await planService.addPlan();
         setPlans([ ...plans, data ]
            .sort((a, b) => b.lastModified - a.lastModified));

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

   useEffect(() => {
      if (searchKey === "") {
         planService
            .getAllPlans()
            .then(res => {
               setPlans(res.data);
            })
            .catch(e => catchErrors(e));
      }

      if (searchKey !== "") {
         planService
            .getPlansBySearch(searchKey)
            .then(res => setPlans(res.data))
            .catch(e => catchErrors(e));
      }
   }, [ searchKey ]);

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

         <div className={ style.header }>
            <button className={ style.add_plan }> +</button>
            <button className={ style.add_plan } onClick={ addPlan }> Додати план</button>

            <div className={ style.search_bar }>
               <input type="text"
                      value={ searchKey }
                      onChange={ (e: React.ChangeEvent<HTMLInputElement>) => handleInput(e) }
                      placeholder={ "Пошук" }
               />
            </div>
         </div>

         <div className={ style.main }>

            <div className={ style.plan_list }>
               { plans && plans.map(item => <PlansItem key={ item.id } plan={ item } deletePlan={ deletePlan }/>) }
            </div>

         </div>

      </div>
   );
};
