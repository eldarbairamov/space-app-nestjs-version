import React from "react";

import { DeleteOutlined } from "@ant-design/icons";
import { ITask } from "../../../interface";
import { updateTaskService, deleteTaskService } from "../../../service";
import { message } from "antd";
import { useAppDispatch } from "../../../hook";
import { taskAction } from "../../../redux/slice/task.slice";
import { TypedOnClick } from "../../../interface/common.interface";

import style from "./Task-Item.module.scss";
import complete from "../../../asset/complete.svg";
import incomplete from "../../../asset/incomplete.svg";

interface ITaskItemProps {
   task: ITask;
}

export function TaskItem({ task }: ITaskItemProps) {
   const dispatch = useAppDispatch();

   const [ messageApi, contextHolder ] = message.useMessage();

   const { updateTaskFn } = updateTaskService(messageApi);
   const { deleteTaskFn } = deleteTaskService(messageApi);

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
}
