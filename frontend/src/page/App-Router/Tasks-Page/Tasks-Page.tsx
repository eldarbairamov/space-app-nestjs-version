import React, { FC, useState } from "react";

import { useLocation } from "react-router";
import { IPlan } from "../../../interface";
import { TaskAdd, TaskHeader, TaskList } from "../../../component";
import { message } from "antd";
import { getTasksService } from "../../../service";

import style from "./Tasks-Page.module.scss";

export interface IInputFields {
   planTitle: string,
   taskTitle: string
}

export const TasksPage: FC = () => {
   const { plan } = useLocation().state as { plan: IPlan };

   const [ inputFields, setInputFields ] = useState<IInputFields>({ planTitle: plan.title, taskTitle: "" });

   const [ messageApi, contextHolder ] = message.useMessage();

   const onChangeFields = (field: string, value: string) => setInputFields({ ...inputFields, [field]: value });

   const { setTasks, tasks } = getTasksService(messageApi, plan.id);

   return (
      <div className={ style.TasksPage }>
         { contextHolder }

         {/* Header */ }
         <TaskHeader onChangeFields={ onChangeFields }
                     inputFields={ inputFields }
                     plan={ plan }
         />

         {/* Add task */ }
         <div className={ style.add_task_wrapper }>
            <TaskAdd tasks={ tasks }
                     plan={ plan }
                     setTasks={ setTasks }
                     inputFields={ inputFields }
                     setInputFields={ setInputFields }
                     onChangeFields={ onChangeFields }
            />
         </div>

         {/* Task list */ }
         <div className={ style.task_list_wrapper }>
            <TaskList setTasks={ setTasks }
                      tasks={ tasks }
            />
         </div>

      </div>
   );
};
