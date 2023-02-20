import React from "react";

import { useLocation } from "react-router";
import { IPlan } from "../../../interface";
import { TaskAdd, TaskHeader, TaskList } from "../../../component";
import { message } from "antd";
import { getTasksService } from "../../../service";

import style from "./Tasks-Page.module.scss";

export function TasksPage() {
   const { plan } = useLocation().state as { plan: IPlan };

   const [ messageApi, contextHolder ] = message.useMessage();

   getTasksService(messageApi, plan.id);

   return (
      <div className={ style.TasksPage }>
         { contextHolder }

         {/* Header */ }
         <TaskHeader plan={ plan }/>

         {/* Add task */ }
         <div className={ style.add_task_wrapper }>
            <TaskAdd plan={ plan }/>
         </div>

         {/* Task list */ }
         <div className={ style.task_list_wrapper }>
            <TaskList/>
         </div>

      </div>
   );
}
