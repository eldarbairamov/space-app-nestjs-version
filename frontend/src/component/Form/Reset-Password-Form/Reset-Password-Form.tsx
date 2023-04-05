import { SubmitHandler, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi/dist/joi";
import { resetPasswordValidator } from "@src/validator/auth.validator";
import { FormControl } from "@src/component";
import { IResetPasswordForm } from "@src/interface";
import { Button } from "@src/component";
import { App } from "antd";

import style from "./Reset-Password-Form.module.scss";

interface IResetPasswordFormProps {
   resetPasswordFn: (password: string, token: string) => Promise<void>;
   resetPasswordToken: string;
}

export function ResetPasswordForm({ resetPasswordFn, resetPasswordToken }: IResetPasswordFormProps) {
   const { message } = App.useApp();

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
         message.error("Паролі не співпадають");
      }
   };

   return (
      <form className={ style.ResetPasswordForm } onSubmit={ handleSubmit(onSubmit) }>

         <FormControl labelName={ "Введіть ваш новий пароль" }
                      fieldName={ "password" }
                      register={ register }
                      errorMessage={ errors.password?.message }
                      isPassword={ true }/>

         <FormControl labelName={ "Введіть пароль ще раз" }
                      fieldName={ "repeat_password" }
                      register={ register }
                      errorMessage={ errors.repeat_password?.message }
                      isPassword={ true }/>

         <Button disabled={ !isValid }
                 style={ { width: "100%" } }
                 text={ "Зберегти" }/>

      </form>
   );
}
