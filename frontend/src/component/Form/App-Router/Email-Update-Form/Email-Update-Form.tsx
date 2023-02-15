import React, { FC } from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi/dist/joi";
import { FormControl } from "../../../UI/Form-Control/Form-Control";
import { emailValidator } from "../../../../validator/auth.validator";
import { message } from "antd";
import { AppRouter } from "../../../../router";
import emailUpdateService from "../../../../service/user/email-update.service";

import style from "./Email-Update-Form.module.scss";

export const EmailUpdateForm: FC = () => {
   const { register, handleSubmit, formState: { errors, isValid } } = useForm<{ email: string }>({
      resolver: joiResolver(emailValidator),
      mode: "onTouched",
   });

   const [ messageApi, contextHolder ] = message.useMessage();

   const { updateEmailFn } = emailUpdateService(messageApi, () => AppRouter.navigate("/email_update/message"));

   const onSubmit: SubmitHandler<{ email: string }> = async ({ email }) => updateEmailFn(email);

   return (
      <form className={ style.EmailUpdateForm } onSubmit={ handleSubmit(onSubmit) }>
         { contextHolder }

         {/* Form controls */ }
         <FormControl labelName={ "Введіть нову адресу електронної пошти" }
                      fieldName={ "email" }
                      register={ register }
                      errorMessage={ errors.email?.message }
                      isPassword={ false }/>

         {/* Submit button */ }
         <button disabled={ !isValid }> Зберегти</button>

      </form>
   );
};
