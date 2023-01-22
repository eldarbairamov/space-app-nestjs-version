import React, { FC, useState } from "react";

import { motion } from "framer-motion";
import { horizontalShakingVariant } from "../../../animation/horizontal-shaking.variant";
import { ExclamationCircleTwoTone } from "@ant-design/icons";
import { type IUserDto } from "../../../interface";
import { type UseFormRegister } from "react-hook-form/dist/types/form";
import { ValidationErrorToaster } from "../Validation-Error-Toaster/Validation-Error-Toaster";

import style from "./Form-Control-Date.module.scss";

interface IInput {
   labelName: string,
   fieldName: "dateOfBirth",
   errorMessage: string | undefined,
   register: UseFormRegister<Partial<IUserDto>>,
}

export const FormControlDate: FC<IInput> = ({ register, errorMessage, fieldName, labelName }) => {
   const [ validationError, setValidationError ] = useState<{ message: string }>({ message: "" });

   const errorMessageWriter = (message: string) => {
      const errorMessage = { message };
      setValidationError({ ...errorMessage });
   };

   return (
      <>
         <ValidationErrorToaster error={ validationError }/>

         {/* FormControlDate wrapper */ }
         <div className={ style.FormControl }>
            <label htmlFor={ "password" }> { labelName } </label>

            <div data-error={ !!errorMessage } className={ style.input_field }>
               <input id={ labelName } type={ "date" } { ...register(fieldName)}/>
               {/* Error icon */ }
               { errorMessage &&
                  <motion.div
                     variants={ horizontalShakingVariant }
                     initial={ "hidden" }
                     animate={ "visible" }
                  >
                     <ExclamationCircleTwoTone
                        onClick={ () => errorMessageWriter(errorMessage) }
                        twoToneColor={ "#e19a99" }
                        style={ { fontSize: "18px" } }/>
                  </motion.div>
               }
            </div>
         </div>
      </>
   );
};
