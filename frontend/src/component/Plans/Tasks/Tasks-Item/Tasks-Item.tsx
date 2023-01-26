import React, { type FC  } from "react";

import style from './Tasks-Item.module.scss'
import complete from "../../../../asset/complete.svg";
import incomplete from "../../../../asset/incomplete.svg";
import { ITask } from "../../../../interface/task.interface";

interface ITasksItem {
   task: ITask
}

export const TasksItem:FC<ITasksItem> = ({task}) => {

   const setTaskStatus = (id: number): void => {
      const tasksArrCopy = [ ...tasks ];
      const task = tasksArrCopy.find(item => item.id === id);

      if (task) {
         task.isCompleted = !task.isCompleted;
      }

      setTasks(tasksArrCopy);
   };

   return (
      <div className={style.TasksItem}>

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
   );
};
