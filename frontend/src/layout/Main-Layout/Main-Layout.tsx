import React, { FC, useEffect } from "react";

import { Outlet } from "react-router-dom";
import { Navbar } from "../../component";
import { userActions } from "../../redux/slice";
import { useAppDispatch } from "../../hook";
import { userService } from "../../services";
import { catchErrors } from "../../helper";

import style from "./Main-Layout.module.scss";

export const MainLayout: FC = () => {
   const dispatch = useAppDispatch();

   useEffect(() => {
      userService
         .getUser()
         .then(res => dispatch(userActions.setInfo(res)))
         .catch(e => catchErrors(e));
   }, []);

   return (
      <div className={ style.MainLayout }>

         {/*Navbar*/ }
         <Navbar/>

         {/* Body */ }
         <div className={ style.body }>
            <Outlet/>
         </div>

      </div>
   );
};