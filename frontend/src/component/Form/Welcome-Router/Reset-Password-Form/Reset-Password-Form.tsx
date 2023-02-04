import React, { type FC } from "react";

import { type SubmitHandler, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi/dist/joi";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { resetPasswordValidator } from "../../../../validator/auth.validator";
import { FormControl } from "../../../UI/Form-Control/Form-Control";
import { authService } from "../../../../services";
import { catchErrors } from "../../../../helper";
import { type IResetPasswordForm } from "../../../../interface/form.interface";

import style from "./Reset-Password-Form.module.scss";

export const ResetPasswordForm: FC = () => {
   const { register, handleSubmit, formState: { errors, isValid }, setValue } = useForm<IResetPasswordForm>({
      resolver: joiResolver(resetPasswordValidator),
      mode: "onTouched",
   });

   const [ searchParams ] = useSearchParams();
   const resetPasswordToken = searchParams.get("token");

   const navigate = useNavigate();

   const onSubmit: SubmitHandler<IResetPasswordForm> = async (data): Promise<void> => {
      const password = data.password;
      const repeatPassword = data.repeat_password;

      try {
         if ((password && resetPasswordToken) && (password === repeatPassword)) {
            const loading = toast.loading("Зачекайте...");

            await authService.resetPassword(password, resetPasswordToken!);

            toast.dismiss(loading);
            toast.success("Вітаємо! У вас новий пароль.");

            setTimeout(() => {
               setValue("password", "");
               setValue("repeat_password", "");
               navigate("/login");
            }, 1500);

         } else {
            toast.error("Паролі не співпадають.");
         }

      } catch (e) {
         catchErrors(e);
      }
   };

   return (
      <form className={ style.ResetPasswordForm } onSubmit={ handleSubmit(onSubmit) }>

         {/* Form controls */ }
         <FormControl labelName={ "Введіть ваш новий пароль" }
                      fieldName={ "password" }
                      register={ register }
                      errorMessage={ errors.password?.message }
                      isPassword={ true }
         />

         <FormControl labelName={ "Введіть пароль ще раз" }
                      fieldName={ "repeat_password" }
                      register={ register }
                      errorMessage={ errors.repeat_password?.message }
                      isPassword={ true }
         />

         {/* Submit button */ }
         <button disabled={ !isValid }> Зберегти</button>

      </form>
   );
};
