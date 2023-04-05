import { useState } from "react";

import { IPlan } from "@src/interface";
import { TaskAdd, TaskHeader, TaskList, Loader, Modal } from "@src/component";
import { getTasksService } from "@src/service";
import { useParams } from "react-router-dom";
import { getOnePlanService } from "@src/service/plan/get-one-plan.service";
import { motion } from "framer-motion";
import { horizontalPresent } from "@src/animation";
import { useAppSelector } from "@src/hook";

import style from "./Tasks-Page.module.scss";

export function TasksPage() {
   const { planId } = useParams<{ planId: IPlan["id"] }>();

   const { isLoading } = useAppSelector(state => state.taskReducer)

   const [ isOpen, setIsOpen ] = useState<boolean>(false);

   const toggleModal = () => !isLoading && setIsOpen(!isOpen)

   getOnePlanService(planId!);
   getTasksService(planId!);

   return (
      <motion.div className={ style.TasksPage }
                  variants={ horizontalPresent }
                  initial={ "initial" }
                  animate={ "animate" }>

         <TaskHeader/>
         <TaskAdd/>
         <TaskList/>

         <Modal isOpen={ isLoading }
                onClose={ toggleModal }
                isBg={ false }>
            <Loader/>
         </Modal>
      </motion.div>
   );
}
