import React, { useEffect } from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi/dist/joi";
import { FormControl } from "../../UI/Form-Control/Form-Control";
import { AppRouter } from "../../../router";
import { emailValidator } from "../../../validator/auth.validator";
import { message } from "antd";
import { emailUpdateService, getUserService } from "../../../service";
import { Button } from "../../../component";
import { useAppSelector } from "../../../hook";

import style from "./Email-Update-Form.module.scss";

export function EmailUpdateForm() {
   const { register, handleSubmit, formState: { errors, isValid } } = useForm<{ email: string }>({
      resolver: joiResolver(emailValidator),
      mode: "onTouched",
   });

   const { username, name, surname } = useAppSelector(state => state.userReducer);

   const [ messageApi, contextHolder ] = message.useMessage();

   const { getUserFn } = getUserService(messageApi);
   const { updateEmailFn } = emailUpdateService(messageApi, () => AppRouter.navigate("/email_update/message", { replace: true }));

   const onSubmit: SubmitHandler<{ email: string }> = async ({ email }) => updateEmailFn(email);

   useEffect(() => {
      if (!(username && name && username)) getUserFn();

   }, [ username, name, surname ]);

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
         <Button disabled={ !isValid } style={ { width: "100%" } } text={ "Зберегти" }/>

      </form>
   );
}
