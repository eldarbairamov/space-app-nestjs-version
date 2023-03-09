import { useEffect } from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi/dist/joi";
import { FormControl } from "@src/component";
import { AppRouter } from "@src/router";
import { emailValidator } from "@src/validator/auth.validator";
import { changeEmailService, getUserService } from "@src/service";
import { Button } from "@src/component";
import { useAppSelector } from "@src/hook";
import { scrollToElement } from "@src/helper/scroll-to-element";
import { motion } from "framer-motion";
import { horizontalPresent } from "@src/animation";

import style from "./Change-Email-Form.module.scss";

export function ChangeEmailForm() {
   const { register, handleSubmit, formState: { errors, isValid } } = useForm<{ email: string }>({
      resolver: joiResolver(emailValidator),
      mode: "onTouched",
   });

   const { username, name, surname } = useAppSelector(state => state.userReducer);

   const { getUserFn } = getUserService();
   const { updateEmailFn } = changeEmailService(() => AppRouter.navigate("/email_update/message", { replace: true }));

   const onSubmit: SubmitHandler<{ email: string }> = async ({ email }) => updateEmailFn(email);

   useEffect(() => {
      if (!(username && name && username)) getUserFn();
      scrollToElement();

   }, [ username, name, surname ]);

   return (
      <motion.form className={ style.ChangeEmailForm }
                   onSubmit={ handleSubmit(onSubmit) }
                   variants={ horizontalPresent }
                   initial={ "initial" }
                   animate={ "animate" }
      >

         {/* Form controls */ }
         <FormControl labelName={ "Введіть нову адресу електронної пошти" }
                      fieldName={ "email" }
                      register={ register }
                      errorMessage={ errors.email?.message }
                      isPassword={ false }/>

         {/* Submit button */ }
         <Button disabled={ !isValid } style={ { width: "100%" } } text={ "Зберегти" }/>

      </motion.form>
   );
}
