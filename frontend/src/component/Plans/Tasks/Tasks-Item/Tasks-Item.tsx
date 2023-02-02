import React, { type FC } from "react";

import { catchErrors } from "../../../../helper";
import { taskService } from "../../../../services";
import { DeleteOutlined } from "@ant-design/icons";
import { TaskDto } from "../../../../dto";

import style from "./Tasks-Item.module.scss";
import complete from "../../../../asset/complete.svg";
import incomplete from "../../../../asset/incomplete.svg";

interface ITasksItem {
   task: TaskDto;
   tasks: TaskDto[];
   setTasks: React.Dispatch<React.SetStateAction<TaskDto[]>>;
}

export const TasksItem: FC<ITasksItem> = ({ task, tasks, setTasks }) => {

   const setTaskStatus = async (taskId: string): Promise<void> => {
      const tasksArrCopy = [ ...tasks ];
      const task = tasksArrCopy.find(item => item.id === taskId);

      if (task) {
         try {
            task.isCompleted = !task.isCompleted;

            await taskService.updateTask(taskId, task.isCompleted);

            setTasks(tasksArrCopy);

         } catch (e) {
            catchErrors(e);
         }
      }
   };

   const deleteTask = async (e: React.MouseEvent<HTMLDivElement>): Promise<void> => {
      e.stopPropagation();
      const updatedArr = tasks.filter(item => item.id !== task.id);
      await taskService.deleteTask(task.id);

      setTasks(updatedArr);
   };

   return (
      <div className={ style.TasksItem }>

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

         <div className={ style.delete } onClick={ (e: React.MouseEvent<HTMLDivElement>) => deleteTask(e) }>
            <DeleteOutlined style={ { fontSize: "20px" } }/>
         </div>

      </div>
   );
};
