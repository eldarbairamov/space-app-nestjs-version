import React from "react";

import { EditOutlined } from "@ant-design/icons";
import { AppRouter } from "../../../router";

import style from "./Dashboard-Edit-Profile.module.scss";

export function DashboardEditProfile() {
   const editProfile = () => AppRouter.navigate("/settings");

   return (
      <div className={ style.DashboardEditProfile }>
         <p onClick={ editProfile }> Редагувати профіль </p>
         <EditOutlined/>
      </div>
   );
}
