import { IPlan } from "@src/interface";
import { TaskAdd, TaskHeader, TaskList, Loader, Modal } from "@src/component";
import { getTasksService } from "@src/service";
import { useParams } from "react-router-dom";
import { getOnePlanService } from "@src/service/plan/get-one-plan.service";
import { motion } from "framer-motion";
import { horizontalPresent } from "@src/animation";
import { useModal } from "@src/hook";
import { PLANS_COLOR } from "@src/constant/color.constant";

import style from "./Tasks-Page.module.scss";

export function TasksPage() {
   const { planId } = useParams<{ planId: IPlan["id"] }>();

   const { isLoading } = getTasksService(planId!);

   const { toggleModal } = useModal(isLoading);

   getOnePlanService(planId!);

   return (
      <>
         { !isLoading &&
            <motion.div className={ style.TasksPage }
                        variants={ horizontalPresent }
                        initial={ "initial" }
                        animate={ "animate" }>

               <TaskHeader/>
               <TaskAdd/>
               <TaskList/>
            </motion.div>
         }

         <Modal isOpen={ isLoading }
                onClose={ toggleModal }
                isBg={ false }>
            <Loader color={ PLANS_COLOR }/>
         </Modal>
      </>
   );
}
