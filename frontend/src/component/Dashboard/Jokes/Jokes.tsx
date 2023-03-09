import { useState } from "react";

import { jokes } from "@src/mock/jokes.mock";
import { Modal } from "@src/component/UI/Modal/Modal";
import { Tooltip } from "antd";
import { useAppSelector } from "@src/hook";

import style from "./Jokes.module.scss";
import laugh from "@src/asset/laugh.png";

export function Jokes() {
   const [ isOpen, setIsOpen ] = useState<boolean>(false);
   const [ joke, setJoke ] = useState<string>(jokes[0]);

   const { isDark } = useAppSelector(state => state.appReducer);

   const toggleModal = () => {
      setIsOpen(!isOpen);
   };

   const generateJoke = async () => {
      const randomIndex = Math.floor(Math.random() * jokes.length);
      setJoke(jokes[randomIndex]);
      toggleModal();
   };

   return (
      <div className={ style.Jokes }>

         <Tooltip title={ "Швидкий анекдот" }
                  placement={ "right" }
                  color={ isDark ? "#2d2f33" : "whitesmoke" }
         >
            <img className={ style.smaller }
                 src={ laugh }
                 alt={ "laugh" }
                 onClick={ generateJoke }
            />
         </Tooltip>

         <Modal isOpen={ isOpen }
                onClose={ toggleModal }
         >
            <>
               <img className={ style.bigger }
                    src={ laugh }
                    alt="laugh"/>
               { joke }
            </>
         </Modal>
      </div>
   );
}
