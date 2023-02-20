import React, { useEffect } from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi/dist/joi";
import { FormControl } from "../../UI/Form-Control/Form-Control";
import { AppRouter } from "../../../router";
import { IChangePasswordForm } from "../../../interface";
import { changePasswordValidator } from "../../../validator/auth.validator";
import { message } from "antd";
import { getUserService, passwordUpdateService } from "../../../service";
import { Button } from "../../../component";
import { useAppSelector } from "../../../hook";

import style from "./Password-Update-Form.module.scss";

export function PasswordUpdateForm () {
   const { register, handleSubmit, formState: { errors, isValid } } = useForm<IChangePasswordForm>({
      resolver: joiResolver(changePasswordValidator),
      mode: "onTouched",
   });

   const { username, name, surname } = useAppSelector(state => state.userReducer);

   const [ messageApi, contextHolder ] = message.useMessage();

   const { getUserFn } = getUserService(messageApi);
   const { updatePasswordFn } = passwordUpdateService(messageApi, () => AppRouter.navigate("/password_update/message", { replace: true }));

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

   useEffect(() => {
      if (!(username && name && username)) getUserFn();

   }, [ username, name, surname ]);

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
         <Button disabled={ !isValid } text={ "Зберегти" } style={ { width: "100%" } }/>

      </form>
   );
}
