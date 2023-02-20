import React, { FC } from "react";

import { Divider } from "antd";
import { useAppSelector } from "../../../hook";

import style from "./Note-Count.module.scss";

export const NoteCount: FC = () => {
   const { notesCount } = useAppSelector(state => state.userReducer);

   return (
      <div className={ style.NoteCount }>
         <Divider> <span> Замітки </span> </Divider>
         <p> { notesCount } </p>
      </div>
   );
};
