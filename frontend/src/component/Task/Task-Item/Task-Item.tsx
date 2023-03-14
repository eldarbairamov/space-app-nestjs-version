import React from "react";

import { DeleteOutlined } from "@ant-design/icons";
import { ITask } from "@src/interface";
import { updateTaskService, deleteTaskService } from "@src/service";
import { useAppDispatch } from "@src/hook";
import { taskAction } from "@src/redux/slice";
import { TypedOnClick } from "@src/interface/common.interface";

import style from "./Task-Item.module.scss";
import complete from "@src/asset/complete.svg";
import incomplete from "@src/asset/incomplete.svg";

interface ITaskItemProps {
   task: ITask;
}

export function TaskItem({ task }: ITaskItemProps) {
   const dispatch = useAppDispatch();

   const { updateTaskFn } = updateTaskService();
   const { deleteTaskFn } = deleteTaskService();

   const setTaskStatus = async (taskId: string): Promise<void> => {
      await updateTaskFn(taskId, !task.isCompleted);
      dispatch(taskAction.updateTask(taskId));
   };

   const deleteTask = async (e: TypedOnClick<HTMLDivElement>): Promise<void> => {
      e.stopPropagation();
      await deleteTaskFn(task.id);
      dispatch(taskAction.deleteTask(task.id));
   };

   return (
      <div className={ style.TaskItem }>

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
}
