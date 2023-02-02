import React, { type FC } from "react";

import { type SubmitHandler, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi/dist/joi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FormControl } from "../../../UI/Form-Control/Form-Control";
import { authService } from "../../../../services";
import { emailValidator } from "../../../../validator/auth.validator";
import { resetFields, catchErrors } from "../../../../helper";
import { UserDto } from "../../../../dto";

import style from "./ForgotPasswordForm.module.scss";

export const ForgotPasswordForm: FC = () => {
   const { register, handleSubmit, formState: { errors, isValid }, setValue } = useForm<Partial<UserDto>>({
      resolver: joiResolver(emailValidator),
      mode: "onTouched",
   });

   const navigate = useNavigate();

   const onSubmit: SubmitHandler<Partial<UserDto>> = async (data): Promise<void> => {
      try {
         const loading = toast.loading("Зачекайте");

         await authService.forgotPassword(data);

         toast.dismiss(loading);
         toast.success("Лист із посиланням вже летить на вказану електронну пошту");

         setTimeout(() => {
            resetFields(setValue);
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
            Введіть адресу електронної пошти вашого аккаунту і ми пришлемо вам посилання на скидання пароля
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
