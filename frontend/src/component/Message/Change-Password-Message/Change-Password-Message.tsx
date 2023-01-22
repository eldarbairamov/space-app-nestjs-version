import React, { type FC, useEffect } from "react";

import applause from "../../../asset/applause.png";
import { useNavigate } from "react-router-dom";

import style from "./Change-Password-Message.module.scss";

export const ChangePasswordMessage: FC = () => {
   const navigate = useNavigate();

   useEffect(() => {

      setTimeout(() => {
         navigate("/");
      }, 5000);

   }, []);

   return (
      <div className={ style.ChangePasswordMessage }>
         <div className={ style.message }>
            <p> Ви успішно оновили свій пароль </p>
         </div>
         <img src={ applause } alt="applause"/>
      </div>
   );
};
