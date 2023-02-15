import React, { FC } from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi/dist/joi";
import { useSearchParams } from "react-router-dom";
import { resetPasswordValidator } from "../../../../validator/auth.validator";
import { FormControl } from "../../../UI/Form-Control/Form-Control";
import { IResetPasswordForm } from "../../../../interface";
import { message } from "antd";
import { WelcomeRouter } from "../../../../router";
import resetPasswordService from "../../../../service/auth/reset-password.service";

import style from "./Reset-Password-Form.module.scss";

export const ResetPasswordForm: FC = () => {
   const { register, handleSubmit, formState: { errors, isValid } } = useForm<IResetPasswordForm>({
      resolver: joiResolver(resetPasswordValidator),
      mode: "onTouched",
   });

   const [ searchParams ] = useSearchParams();
   const resetPasswordToken = searchParams.get("token");

   const [ messageApi, contextHolder ] = message.useMessage();

   const { resetPasswordFn } = resetPasswordService(messageApi, () => WelcomeRouter.navigate("/login", { replace: true }));

   const onSubmit: SubmitHandler<IResetPasswordForm> = async (data) => {
      const password = data.password;
      const repeatPassword = data.repeat_password;

      if ((password && resetPasswordToken) && (password === repeatPassword)) {
         await resetPasswordFn(password, resetPasswordToken!);
      } else {
         messageApi.error("Паролі не співпадають");
      }
   };

   return (
      <form className={ style.ResetPasswordForm } onSubmit={ handleSubmit(onSubmit) }>
         { contextHolder }

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
