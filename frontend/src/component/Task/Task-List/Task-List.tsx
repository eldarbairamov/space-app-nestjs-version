import React, { FC } from "react";

import { TaskItem } from "../Task-Item/Task-Item";
import { ITask } from "../../../interface";
import { TypedSetState } from "../../../interface/common.interface";

import style from "./Task-List.module.scss";

interface ITaskListProps {
   tasks: ITask[];
   setTasks: TypedSetState<ITask[]>;
}

export const TaskList: FC<ITaskListProps> = ({ tasks, setTasks }) => {
   return (
      <div className={ style.TaskList }>
         { tasks && tasks.map(task => (
            <TaskItem key={ task.id } task={ task } setTasks={ setTasks } tasks={ tasks }/>
         )) }
      </div>
   );
};
