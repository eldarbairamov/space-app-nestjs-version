import React, { type FC } from "react";

import { type SubmitHandler, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi/dist/joi";
import toast, { Toaster } from "react-hot-toast";
import { type IUserDto } from "../../../../interface";
import { FormControl } from "../../../UI/Form-Control/Form-Control";
import { emailValidator } from "../../../../validator/auth.validator";
import { useNavigate } from "react-router-dom";
import { type AxiosApiError, userService } from "../../../../services";

import style from "./Email-Update-Form.module.scss";

export const EmailUpdateForm: FC = () => {
   const { register, handleSubmit, formState: { errors, isValid }, setValue, getValues } = useForm<Partial<IUserDto>>({
      resolver: joiResolver(emailValidator),
      mode: "onTouched",
   });

   const navigate = useNavigate();

   const onSubmit: SubmitHandler<Partial<IUserDto>> = async (data): Promise<void> => {
      try {
         const loading = toast.loading("Зачекайте...");

         const message = await userService.emailUpdate({ email: data.email! });

         toast.dismiss(loading);
         toast.success(message, { duration: 6000 });

         setTimeout(() => {
            navigate("/");
         }, 6000);

      } catch (e) {
         const axiosError = e as AxiosApiError;
         const response = axiosError.response?.data.message as string;

         toast.dismiss();
         toast.error(response ? response : axiosError.message);
      }
   };

   return (
      <form className={ style.EmailUpdateForm } onSubmit={ handleSubmit(onSubmit) }>

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

         {/* Form controls */ }
         <FormControl labelName={ "Введіть нову адресу електронної пошти" } fieldName={ "email" } register={ register }
                      errorMessage={ errors.email?.message } isPassword={ false }/>

         {/* Submit button */ }
         <button disabled={ !isValid }> Зберегти</button>

      </form>
   );
};
