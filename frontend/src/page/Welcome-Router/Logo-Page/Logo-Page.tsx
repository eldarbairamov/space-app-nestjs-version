import React, { type FC } from "react";

import { useNavigate } from "react-router-dom";
import { WelcomeLogo } from "../../../component";

import style from "./Logo-Page.module.scss";

export const LogoPage: FC = () => {
   const navigate = useNavigate();

   const enterToApp = () => {
      navigate("/registration");
   };

   return (
      <div className={ style.WelcomePage }>

         <div onClick={ enterToApp }>
            <WelcomeLogo/>
         </div>

      </div>
   );
};
