import React from "react";

import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import { fadePresent } from "@src/animation";

import style from "./Modal.module.scss";

interface IModal {
   isOpen: boolean,
   onClose: () => void
   children: React.ReactNode
}

export function Modal({ isOpen, onClose, children }: IModal) {
   return createPortal(
      <AnimatePresence>
         { isOpen &&
            <motion.div className={ style.Modal }
                        variants={ fadePresent }
                        initial={ "initial" }
                        animate={ "animate" }
                        exit={ "exit" }
            >
               <div className={ style.overlay } onClick={ onClose } data-open={ isOpen }>
                  <div className={ style.content }>
                     { children }
                  </div>
               </div>
            </motion.div>
         }
      </AnimatePresence>,
      document.body,
   );
}