import React, { type FC, useState } from "react";
import { Toaster } from "react-hot-toast";
import { v4 } from "uuid";

import style from "./Plans-Page.module.scss";
import brain from "../../../asset/brain.png";
import { useNavigate } from "react-router-dom";

interface IGoalSection {
   id: string
   sectionName: string,
   lastModified: number
}

export const PlansPage: FC = () => {
   const [ sections, setSections ] = useState<IGoalSection[]>([]);

   const navigate = useNavigate();

   const addSection = () => {

      const newSection: IGoalSection = {
         id: v4(),
         sectionName: "Новий план",
         lastModified: Date.now(),
      };

      setSections([ ...sections, newSection ]);
   };

   const choosePlan = (planId: string) => navigate(`/plans/${ planId }`);

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
            <button className={ style.header } onClick={ addSection }> Додати план +</button>
         </div>

         <div className={ style.bottom }>

            <div className={ style.plan_list }>
               { sections && sections.map(item => (

                  <div className={ style.plans_item } onClick={ () => choosePlan(item.id) }>

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
