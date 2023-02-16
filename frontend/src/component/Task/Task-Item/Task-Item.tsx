import React, { FC } from "react";

import { DeleteOutlined } from "@ant-design/icons";
import { ITask } from "../../../interface";
import { updateTaskService, deleteTaskService } from "../../../service";
import { message } from "antd";

import style from "./Task-Item.module.scss";
import complete from "../../../asset/complete.svg";
import incomplete from "../../../asset/incomplete.svg";

interface ITaskItem {
   task: ITask;
   tasks: ITask[];
   setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
}

export const TaskItem: FC<ITaskItem> = ({ task, tasks, setTasks }) => {
   const [ messageApi, contextHolder ] = message.useMessage();

   const { updateTaskFn } = updateTaskService(messageApi);
   const { deleteTaskFn } = deleteTaskService(messageApi);

   const setTaskStatus = async (taskId: string): Promise<void> => {
      const tasksArrCopy = [ ...tasks ];
      const task = tasksArrCopy.find(item => item.id === taskId);

      if (task) {
         task.isCompleted = !task.isCompleted;
         await updateTaskFn(taskId, task.isCompleted);
         setTasks(tasksArrCopy);
      }
   };

   const deleteTask = async (e: React.MouseEvent<HTMLDivElement>): Promise<void> => {
      e.stopPropagation();
      const updatedArr = tasks.filter(item => item.id !== task.id);
      await deleteTaskFn(task.id, task.planId);
      setTasks(updatedArr);
   };

   return (
      <div className={ style.TaskItem }>
         { contextHolder }

         {/* Task status */ }
         <div className={ style.task_status }>
            { task.isCompleted ?
               <img onClick={ () => setTaskStatus(task.id) } src={ complete } alt="incomplete"/>
               :
               <img onClick={ () => setTaskStatus(task.id) } src={ incomplete } alt="incomplete"/>
            }
         </div>

         {/* Task title */ }
         <div className={ style.task_title }><p> { task.title } </p></div>

         {/* Delete icon */ }
         <div className={ style.delete } onClick={ (e: React.MouseEvent<HTMLDivElement>) => deleteTask(e) }>
            <DeleteOutlined style={ { fontSize: "20px" } }/>
         </div>

      </div>
   );
};
