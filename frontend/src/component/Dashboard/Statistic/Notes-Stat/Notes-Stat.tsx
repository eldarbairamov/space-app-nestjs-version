import React, { FC, useEffect } from "react";

import { Divider } from "antd";
import { useAppDispatch, useAppSelector } from "../../../../hook/redux.hook";
import { asyncNotesActions } from "../../../../redux/slice/notes.slice";

import style from "./Notes-Stat.module.scss";

export const NotesStat: FC = () => {
   const { count } = useAppSelector(state => state.notesReducer);
   const dispatch = useAppDispatch();

   useEffect(() => {
      dispatch(asyncNotesActions.getNotesCount());
   }, []);

   return (
      <div className={ style.NotesStat }>
         <Divider> <span>Замітки</span> </Divider>
         <p> { count } </p>
      </div>
   );
};
