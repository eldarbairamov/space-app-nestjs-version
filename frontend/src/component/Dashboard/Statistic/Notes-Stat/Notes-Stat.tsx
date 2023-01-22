import React, { FC } from "react";

import { Divider } from "antd";

import style from "./Notes-Stat.module.scss";

export const NotesStat: FC = () => {
   return (
      <div className={ style.NotesStat }>
         <Divider> <span>Замітки</span> </Divider>
         <p> 13 </p>
      </div>
   );
};
