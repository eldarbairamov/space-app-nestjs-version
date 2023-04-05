import { noteActions } from "@src/redux/slice";
import { useAppDispatch } from "@src/hook";

import style from './Font-Options.module.scss'

export function FontOptions({ font }: { font: string }) {
   const dispatch = useAppDispatch();

   return (
      <div className={ style.FontOptions }>
         <p onClick={ () => dispatch(noteActions.changeFont('Roboto')) }
            data-active={ font }>
            Normal
         </p>

         <p> | </p>

         <p onClick={ () => dispatch(noteActions.changeFont('Caveat')) }
            data-active={ font }>
            Handwrite
         </p>
      </div>
   )
}
