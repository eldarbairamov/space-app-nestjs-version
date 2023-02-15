import React, { FC } from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi/dist/joi";
import { FormControl } from "../../../UI/Form-Control/Form-Control";
import { emailValidator } from "../../../../validator/auth.validator";
import { message } from "antd";
import { WelcomeRouter } from "../../../../router";
import forgotPasswordService from "../../../../service/auth/forgot-password.service";

import style from "./Forgot-Password-Form.module.scss";

export const ForgotPasswordForm: FC = () => {
   const { register, handleSubmit, formState: { errors, isValid } } = useForm<{ email: string }>({
      resolver: joiResolver(emailValidator),
      mode: "onTouched",
   });

   const [ messageApi, contextHolder ] = message.useMessage();

   const { forgotPasswordFn } = forgotPasswordService(messageApi, () => WelcomeRouter.navigate("/forgot_password_message", { replace: true }));

   const onSubmit: SubmitHandler<{ email: string }> = async ({ email }) => forgotPasswordFn(email);

   return (
      <form className={ style.ForgotPasswordForm } onSubmit={ handleSubmit(onSubmit) }>
         { contextHolder }

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
