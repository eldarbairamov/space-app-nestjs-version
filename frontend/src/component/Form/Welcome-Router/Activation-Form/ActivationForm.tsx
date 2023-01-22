import React, { type ChangeEvent, type FC, type FormEvent, useState } from "react";

import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { authService, type AxiosApiError } from "../../../../services";

import style from "./ActivationForm.module.scss";

export const ActivationForm: FC = () => {
   const [ value, setValue ] = useState<string>("");

   const navigate = useNavigate();

   const handleChange = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value);

   const handleSubmit = async (e: FormEvent<HTMLButtonElement>): Promise<void> => {
      try {
         e.preventDefault();

         const loading = toast.loading("Зачекайте");

         const message = await authService.accountActivation(value);

         toast.dismiss(loading);
         toast.success(message);

         setTimeout(() => {
            setValue("");
            navigate("/login");
         }, 1500);

      } catch (e) {
         const axiosError = e as AxiosApiError;
         const response = axiosError.response?.data.message as string;

         toast.dismiss();
         toast.error(response ? response : axiosError.message);
      }
   };

   return (
      <div className={ style.ActivationForm }>

         {/* Toaster */ }
         <Toaster
            toastOptions={ {
               error: {
                  style: {
                     textAlign: "center",
                  },
                  iconTheme: {
                     primary: "#df8281",
                     secondary: "white",
                  },
               },
               success: {
                  style: {
                     textAlign: "center",
                  },
                  iconTheme: {
                     primary: "#84df81",
                     secondary: "white",
                  },
               },
            } }
         />

         {/* Message */ }
         <p className={ style.message }>
            Будь ласка, введіть код активації
         </p>

         {/* Input */ }
         <div className={ style.input_field }>
            <input type="text" value={ value } onChange={ (e: ChangeEvent<HTMLInputElement>) => handleChange(e) }/>
         </div>

         {/* Submit button */ }
         <button disabled={ !value }
                 onClick={ (e: FormEvent<HTMLButtonElement>) => handleSubmit(e) }> Надіслати
         </button>

      </div>
   );
};
