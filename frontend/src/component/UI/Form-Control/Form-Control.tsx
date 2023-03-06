import React, { CSSProperties, useState } from "react";

import { motion } from "framer-motion";
import { horizontalShaking } from "../../../animation";
import { UseFormRegister } from "react-hook-form/dist/types/form";
import { ValidationToaster } from "../Validation-Toaster/Validation-Toaster";
import { message } from "antd";

import style from "./Form-Control.module.scss";
import warning from '../../../asset/warning.svg'

interface IInput {
   labelName: string,
   fieldName: string,
   errorMessage: string | undefined,
   isPassword: boolean
   register: UseFormRegister<any>,
   style?: CSSProperties
}

export function FormControl({ register, errorMessage, fieldName, labelName, isPassword, ...props }: IInput) {
   const [ validationError, setValidationError ] = useState<{ message: string }>({ message: "" });
   const [ isPasswordHidden, setIsPasswordHidden ] = useState<boolean>(isPassword);

   const [ messageApi, contextHolder ] = message.useMessage();

   const errorMessageWriter = (message: string) => {
      const errorMessage = { message };
      setValidationError({ ...errorMessage });
   };

   const passwordCondition: string = isPasswordHidden ? "password" : "text";
   const passwordValueCondition: string = isPasswordHidden ? "[ показати ]" : "[ скрити ]";

   const showHiddenPassword = (): void => setIsPasswordHidden(!isPasswordHidden);

   return (
      <>
         <ValidationToaster error={ validationError } messageApi={ messageApi }/>
         { contextHolder }

         {/* FormControl wrapper */ }
         <div className={ style.FormControl }>
            <div className={ style.password_wrapper }>
               <label htmlFor={ "password" }> { labelName } </label>
               { isPassword && <p onClick={ showHiddenPassword }> { passwordValueCondition } </p> }
            </div>
            <div data-error={ !!errorMessage } className={ style.input_field }>
               <input id={ labelName } { ...props } type={ passwordCondition } { ...register(fieldName) }/>

               {/* Error icon */ }
               { errorMessage &&
                  <motion.div
                     variants={ horizontalShaking }
                     initial={ "initial" }
                     animate={ "animate" }
                  >
                     <img src={warning} alt="warning" style={{width: "21px"}} onClick={ () => errorMessageWriter(errorMessage) }/>
                  </motion.div>
               }
            </div>
         </div>

      </>
   );
}
