import { Button, WelcomeLogo } from "@src/component";

import { v4 } from "uuid";
import { WelcomeRouter } from "@src/router";
import { motion } from "framer-motion";

import style from "./Info.module.scss";

export function Info() {
   return (
      <div className={ style.Info }>
         <WelcomeLogo/>

         <motion.div className={ style.content }
                     initial={ { x: -10 } }
                     animate={ { x: 0 } }
         >
            <p> Це твій особистий простір, твій друг, який зберігає думки, плани та кращі моменти із життя. </p>

            <p> Тут ти зустрінеш інтуїтивний інтерфейс та три наступних секції: </p>

            <div className={ style.sections }>
               <span> замітки </span>
               <span> / </span>
               <span> плани  </span>
               <span> / </span>
               <span> моменти </span>
            </div>

            <p> В них ти зможеш лишати частинку своїх думок, бажань, планів та моментів. </p>

            <div className={ style.end }>
               <Button key={ v4() } text={ "Приємного користування!" } onClick={ () => WelcomeRouter.navigate("/") }/>
            </div>

         </motion.div>
      </div>
   );
}
