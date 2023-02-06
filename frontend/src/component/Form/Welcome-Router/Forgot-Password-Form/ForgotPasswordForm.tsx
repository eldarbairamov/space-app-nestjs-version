import React, { FC } from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi/dist/joi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FormControl } from "../../../UI/Form-Control/Form-Control";
import { authService } from "../../../../services";
import { emailValidator } from "../../../../validator/auth.validator";
import { catchErrors } from "../../../../helper";

import style from "./ForgotPasswordForm.module.scss";

export const ForgotPasswordForm: FC = () => {
   const { register, handleSubmit, formState: { errors, isValid }, setValue } = useForm<{ email: string }>({
      resolver: joiResolver(emailValidator),
      mode: "onTouched",
   });

   const navigate = useNavigate();

   const onSubmit: SubmitHandler<{ email: string }> = async ({ email }): Promise<void> => {
      try {
         const loading = toast.loading("Зачекайте...");

         await authService.forgotPassword(email);

         toast.dismiss(loading);
         toast.success("Лист із посиланням вже летить на вказану електронну пошту");

         setTimeout(() => {
            setValue("email", "");
            navigate("/");
         }, 1500);

      } catch (e) {
         catchErrors(e);
      }
   };

   return (
      <form className={ style.ForgotPasswordForm } onSubmit={ handleSubmit(onSubmit) }>

         {/* Message  */ }
         <p className={ style.message }>
            Введіть адресу електронної пошти вашого аккаунту і ми пришлемо вам посилання на скидання пароля.
         </p>

         {/* Form control */ }
         <FormControl
            labelName={ "" }
            fieldName={ "email" }
            register={ register }
            errorMessage={ errors.email?.message }
            isPassword={ false }
         />

         {/* Submit button */ }
         <button disabled={ !isValid }> Надіслати</button>

      </form>
   );
};
