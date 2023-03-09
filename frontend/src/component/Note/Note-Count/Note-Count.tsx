import { Divider } from "antd";
import { useAppSelector } from "@src/hook";

import style from "./Note-Count.module.scss";

export function NoteCount() {
   const { notesCount } = useAppSelector(state => state.userReducer);

   return (
      <div className={ style.NoteCount }>
         <Divider> Замітки </Divider>
         <p> { notesCount } </p>
      </div>
   );
}
