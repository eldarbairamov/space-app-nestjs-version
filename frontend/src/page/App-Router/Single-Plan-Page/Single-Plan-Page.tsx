import React, { type FC, useState } from "react";

import { useLocation } from "react-router";
import { type IPlan } from "../Plans-Page/Plans-Page";

import style from "./Single-Plan-Page.module.scss";
import incomplete from "../../../asset/incomplete.svg";
import complete from "../../../asset/complete.svg";

export const SinglePlanPage: FC = () => {
   const [ tasks, setTasks ] = useState<any>([]);
   const [ value, setValue ] = useState<any>("");

   const handleInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
      const value = event.target.value;
      setValue(value);
   };

   const addTask = (): void => {
      if (value !== "") {
         setTasks([ ...tasks, { id: Number(new Date()), title: value, isCompleted: false } ]);
         setValue("");
      }
   };

   const setTaskStatus = (id: number): void => {
      const copy = [ ...tasks ];
      const target = copy.find(item => item.id === id);

      target!.isCompleted = !(target!.isCompleted);
      setTasks(copy);
   };

   const { plan } = useLocation().state as { plan: IPlan };

   const formatDate = new Date(plan.lastModified).toLocaleDateString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
   });

   return (
      <div className={ style.SinglePlanPage }>

         <div className={ style.top }>
            <input className={ style.plan_title } value={ plan.sectionName } autoFocus/>
            <p className={ style.date }> { formatDate } </p>
         </div>

         <div className={ style.mid }>
            <div className={ style.add }>
               <p onClick={ addTask }> + </p>
               <input type="text" value={ value }
                      onChange={ (e: React.ChangeEvent<HTMLInputElement>) => handleInput(e) }
                      placeholder={ "Додати задачу" }/>
            </div>
         </div>

         <div className={ style.bottom }>
            <div className={ style.task_list }>
               { tasks && tasks.map((task: any) => (

                  <div className={ style.task }>

                     <div className={ style.image }>
                        { task.isCompleted ?
                           <img onClick={ () => setTaskStatus(task.id) } src={ complete } alt="incomplete"/>
                           :
                           <img onClick={ () => setTaskStatus(task.id) } src={ incomplete } alt="incomplete"/>
                        }
                     </div>

                     <div className={ style.task_title }>
                        <p> { task.title } </p>
                     </div>

                  </div>

               )) }
            </div>
         </div>
      </div>
   );
};
