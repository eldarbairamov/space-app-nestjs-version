import React, { type FC, useState } from "react";

import { useLocation } from "react-router";
import { type IPlan } from "../Plans-Page/Plans-Page";
import { dateFormat } from "../../../helper";
import { type ITask } from "../../../interface/task.interface";

import style from "./Tasks-Page.module.scss";
import incomplete from "../../../asset/incomplete.svg";
import complete from "../../../asset/complete.svg";


interface IInputFields {
   planTitle: string,
   taskTitle: string
}

export const TasksPage: FC = () => {
   const { plan } = useLocation().state as { plan: IPlan };

   const [ tasks, setTasks ] = useState<ITask[]>([]);
   const [ inputFields, setInputFields ] = useState<IInputFields>({ planTitle: plan.title, taskTitle: "" });

   const addTask = (): void => {
      if (inputFields.taskTitle !== "") {
         setTasks([
            ...tasks,
            {
               id: Number(new Date()),
               title: inputFields.taskTitle,
               isCompleted: false,
            },
         ]);

         setInputFields({ ...inputFields, taskTitle: "" });
      }
   };

   const setTaskStatus = (id: number): void => {
      const tasksArrCopy = [ ...tasks ];
      const task = tasksArrCopy.find(item => item.id === id);

      if (task) {
         task.isCompleted = !task.isCompleted;
      }

      setTasks(tasksArrCopy);
   };

   const onChangeFields = (field: string, value: string) => {
      setInputFields({ ...inputFields, [field]: value });
   };

   const formatDate = dateFormat(plan.lastModified);

   return (
      <div className={ style.TasksPage }>

         <div className={ style.top }>
            <input type={ "text" }
                   className={ style.plan_title }
                   id={ "planTitle" }
                   value={ inputFields.planTitle }
                   onChange={ (e: React.ChangeEvent<HTMLInputElement>) => onChangeFields("planTitle", e.target.value) }
                   autoFocus
            />
            <p className={ style.plan_date }> { formatDate } </p>
         </div>

         <div className={ style.mid }>
            <div className={ style.header }>
               <p onClick={ addTask }> + </p>
               <input type={ "text" }
                      id={ "taskTitle" }
                      value={ inputFields.taskTitle }
                      onChange={ (e: React.ChangeEvent<HTMLInputElement>) => onChangeFields("taskTitle", e.target.value) }
                      placeholder={ "Додати задачу" }
               />
            </div>
         </div>

         <div className={ style.bottom }>
            <div className={ style.task_list }>
               { tasks && tasks.map((task: any) => (

                  <div className={ style.task_item }>
                     <div className={ style.task_status }>
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
