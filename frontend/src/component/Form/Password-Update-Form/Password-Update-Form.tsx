import React, { FC } from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi/dist/joi";
import { FormControl } from "../../UI/Form-Control/Form-Control";
import { AppRouter } from "../../../router";
import { IChangePasswordForm } from "../../../interface";
import { changePasswordValidator } from "../../../validator/auth.validator";
import { message } from "antd";
import { passwordUpdateService } from "../../../service";

import style from "./Password-Update-Form.module.scss";

export const PasswordUpdateForm: FC = () => {
   const { register, handleSubmit, formState: { errors, isValid } } = useForm<IChangePasswordForm>({
      resolver: joiResolver(changePasswordValidator),
      mode: "onTouched",
   });

   const [ messageApi, contextHolder ] = message.useMessage();

   const { updatePasswordFn } = passwordUpdateService(messageApi, () => AppRouter.navigate("/password_update/message"));

   const onSubmit: SubmitHandler<IChangePasswordForm> = async (data) => {
      const newPassword = data.password;
      const currentPassword = data.current_password;
      const repeatPassword = data.repeat_password;

      if (newPassword === repeatPassword) {
         await updatePasswordFn(newPassword, currentPassword);
      } else {
         messageApi.error("Паролі не співпадають");
      }
   };

   return (
      <form className={ style.PasswordUpdateForm } onSubmit={ handleSubmit(onSubmit) }>
         { contextHolder }

         {/* Form controls */ }
         <FormControl labelName={ "Введіть ваш поточний пароль" }
                      fieldName={ "current_password" }
                      register={ register }
                      errorMessage={ errors.current_password?.message }
                      isPassword={ true }
         />

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
