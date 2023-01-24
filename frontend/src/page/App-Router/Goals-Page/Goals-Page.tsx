import React, { type FC, useState } from "react";
import { Toaster } from "react-hot-toast";

import style from "./Goals-Page.module.scss";
import folder from "../../../asset/brain.png";

interface IGoalSection {
   sectionName: string,
   lastModified: number
}

export const Goals: FC = () => {
   const date = Date.now();

   const [ sections, setSections ] = useState<IGoalSection[]>([]);

   const addSection = () => {

      const newSection: IGoalSection = {
         sectionName: "Новий план",
         lastModified: Date.now(),
      };

      setSections([ ...sections, newSection ]);
   };

   return (
      <div className={ style.GoalPage }>

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
            <p className={style.header} onClick={ addSection }> Додати план </p>
         </div>

         <div className={ style.bottom }>

            <div className={style.plan_list}>
               { sections && sections.map(item => (
                  <div className={ style.plan }>

                     <p className={ style.plan_name }> { item.sectionName }  </p>

                     <img src={ folder } alt="folder"/>

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
