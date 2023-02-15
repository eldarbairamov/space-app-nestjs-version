import React, { FC } from "react";

import { Divider } from "antd";
import { useAppSelector } from "../../../../hook";

import style from "./Notes-Stat.module.scss";

export const NotesStat: FC = () => {
   const {notesCount} = useAppSelector(state => state.userReducer)

   return (
      <div className={ style.NotesStat }>
         <Divider> <span>Замітки</span> </Divider>
         <p> { notesCount } </p>
      </div>
   );
};
