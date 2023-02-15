import React, { ChangeEvent, FC, FormEvent, useState } from "react";

import { message } from "antd";
import { WelcomeRouter } from "../../../../router";
import activationService from "../../../../service/auth/activation.service";

import style from "./ActivationForm.module.scss";

export const ActivationForm: FC = () => {
   const [ value, setValue ] = useState<string>("");

   const handleChange = (value: string) => setValue(value);

   const [ messageApi, contextHolder ] = message.useMessage();

   const { activationFn } = activationService(messageApi, () => WelcomeRouter.navigate("/login", { replace: true }));

   const handleSubmit = async (e: FormEvent<HTMLButtonElement>) => {
      e.preventDefault();
      await activationFn(value);
   };

   return (
      <div className={ style.ActivationForm }>
         { contextHolder }

         {/* Message */ }
         <p className={ style.message }>
            Будь ласка, введіть код активації
         </p>

         {/* Input */ }
         <div className={ style.input_field }>
            <input type="text"
                   value={ value }
                   onChange={ (e: ChangeEvent<HTMLInputElement>) => handleChange(e.target.value) }/>
         </div>

         {/* Submit button */ }
         <button disabled={ !value }
                 onClick={ (e: FormEvent<HTMLButtonElement>) => handleSubmit(e) }> Надіслати
         </button>

      </div>
   );
};