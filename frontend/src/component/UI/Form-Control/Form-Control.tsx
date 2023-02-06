import React, { FC, useState } from "react";

import { motion } from "framer-motion";
import { horizontalShakingVariant } from "../../../animation/horizontal-shaking.variant";
import { ExclamationCircleTwoTone } from "@ant-design/icons";
import { UseFormRegister } from "react-hook-form/dist/types/form";
import { ValidationErrorToaster } from "../Validation-Error-Toaster/Validation-Error-Toaster";

import style from "./Form-Control.module.scss";

interface IInput {
   labelName: string,
   fieldName: string,
   errorMessage: string | undefined,
   isPassword: boolean
   register: UseFormRegister<any>,
}

export const FormControl: FC<IInput> = ({ register, errorMessage, fieldName, labelName, isPassword }) => {
   const [ validationError, setValidationError ] = useState<{ message: string }>({ message: "" });
   const [ isPasswordHidden, setIsPasswordHidden ] = useState<boolean>(isPassword);

   const errorMessageWriter = (message: string) => {
      const errorMessage = { message };
      setValidationError({ ...errorMessage });
   };

   const passwordCondition: string = isPasswordHidden ? "password" : "text";
   const passwordValueCondition: string = isPasswordHidden ? "[ показати ]" : "[ скрити ]";

   const showHiddenPassword = (): void => setIsPasswordHidden(!isPasswordHidden);

   return (
      <>
         <ValidationErrorToaster error={ validationError }/>

         {/* FormControl wrapper */ }
         <div className={ style.FormControl }>
            <div className={ style.password_wrapper }>
               <label htmlFor={ "password" }> { labelName } </label>
               { isPassword && <p onClick={ showHiddenPassword }> { passwordValueCondition } </p> }
            </div>
            <div data-error={ !!errorMessage } className={ style.input_field }>
               <input id={ labelName } type={ passwordCondition } { ...register(fieldName) }/>

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
