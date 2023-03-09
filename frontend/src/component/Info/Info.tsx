import { Button, WelcomeLogo } from "@src/component";

import style from "./Info.module.scss";
import { v4 } from "uuid";
import { WelcomeRouter } from "@src/router";

export function Info() {
   return (
      <div className={ style.Info }>
         <WelcomeLogo/>

         <div className={ style.content }>
            <p> Це твій особистий простір, твій друг, який зберігає думки, плани та кращі моменти із життя. </p>

            <p> Тут ти зустрінеш інтуїтивний інтерфейс та три наступних секції: </p>

            <div className={ style.sections }>
               <span> замітки </span>
               <span> / </span>
               <span> плани  </span>
               <span> / </span>
               <span> моменти </span>
            </div>

            <p> В кожній із них ти зможеш лишати частинку своїх думок, бажань, планів та моментів. </p>

            {/*<p className={ style.end }> Приємного користування! </p>*/ }

            <div className={ style.end }>
               <Button key={ v4() } text={ "Приємного користування!" } onClick={ () => WelcomeRouter.navigate("/") }/>
            </div>

         </div>
      </div>
   );
}
