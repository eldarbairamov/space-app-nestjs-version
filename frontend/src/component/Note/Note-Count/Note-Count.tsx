import React, { FC } from "react";

import { Divider } from "antd";

import style from "./Note-Count.module.scss";

interface INoteCountProps {
   notesCount: number;
}

export const NoteCount: FC<INoteCountProps> = ({ notesCount }) => {

   return (
      <div className={ style.NoteCount }>
         <Divider> <span> Замітки </span> </Divider>
         <p> { notesCount } </p>
      </div>
   );
};
