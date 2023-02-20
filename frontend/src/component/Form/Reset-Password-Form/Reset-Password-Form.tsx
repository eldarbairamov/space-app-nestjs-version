import React from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi/dist/joi";
import { MessageInstance } from "antd/es/message/interface";
import { resetPasswordValidator } from "../../../validator/auth.validator";
import { FormControl } from "../../UI/Form-Control/Form-Control";
import { IResetPasswordForm } from "../../../interface";
import { Button } from "../../../component";

import style from "./Reset-Password-Form.module.scss";

interface IResetPasswordFormProps {
   messageApi: MessageInstance;
   resetPasswordFn: (password: string, token: string) => Promise<void>;
   resetPasswordToken: string;
}

export function ResetPasswordForm({ resetPasswordFn, messageApi, resetPasswordToken }: IResetPasswordFormProps) {
   const { register, handleSubmit, formState: { errors, isValid } } = useForm<IResetPasswordForm>({
      resolver: joiResolver(resetPasswordValidator),
      mode: "onTouched",
   });

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
         <Button disabled={ !isValid } style={ { width: "100%" } } text={ "Зберегти" }/>

      </form>
   );
}
