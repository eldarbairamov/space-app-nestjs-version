import React, { ChangeEvent, FC, type FormEvent, useState } from "react";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { authService } from "../../../../services";
import { catchErrors } from "../../../../helper";

import style from "./ActivationForm.module.scss";

export const ActivationForm: FC = () => {
   const [ value, setValue ] = useState<string>("");

   const navigate = useNavigate();

   const handleChange = (value: string) => setValue(value);

   const handleSubmit = async (e: FormEvent<HTMLButtonElement>): Promise<void> => {
      try {
         e.preventDefault();

         const loading = toast.loading("Зачекайте...");

         await authService.accountActivation(value);

         toast.dismiss(loading);
         toast.success("Ваш аккаунт активовано");

         setTimeout(() => {
            setValue("");
            navigate("/login");
         }, 1500);

      } catch (e) {
         catchErrors(e);
      }
   };

   return (
      <div className={ style.ActivationForm }>

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
