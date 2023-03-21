import { SubmitHandler, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { IRegistration, IRegistrationForm } from "@src/interface";
import { FormControl } from "@src/component";
import { registrationValidator } from "@src/validator/auth.validator";
import { UnauthorizedRouter } from "@src/router";
import { Button } from "@src/component";
import { motion } from "framer-motion";
import { horizontalPresent } from "@src/animation";

import style from "./Registration-Form.module.scss";

interface IRegistrationFormProps {
   registrationFn: (body: IRegistration) => Promise<void>;
}

export function RegistrationForm({ registrationFn }: IRegistrationFormProps) {
   const { register, handleSubmit, formState: { errors, isValid } } = useForm<IRegistrationForm>({
      resolver: joiResolver(registrationValidator),
      mode: "onTouched",
   });

   const onSubmit: SubmitHandler<IRegistrationForm> = async (data) => registrationFn(data);

   return (
      <motion.form className={ style.RegistrationForm }
                   onSubmit={ handleSubmit(onSubmit) }
                   variants={ horizontalPresent }
                   initial={ "initial" }
                   animate={ "animate" }
      >

         {/* FormControlDate fields */ }
         <FormControl labelName={ "Ім'я користувача" }
                      fieldName={ "username" }
                      register={ register }
                      errorMessage={ errors.username?.message } isPassword={ false }/>

         <FormControl labelName={ "Електронна пошта" }
                      fieldName={ "email" }
                      register={ register }
                      errorMessage={ errors.email?.message }
                      isPassword={ false }/>

         <FormControl labelName={ "Пароль" }
                      fieldName={ "password" }
                      register={ register }
                      errorMessage={ errors.password?.message }
                      isPassword={ true }/>

         {/* Submit button */ }
         <Button disabled={ !isValid } text={ "Зареєструватись" } style={ { width: "100%" } }/>

         {/*  Footer */ }
         <div className={ style.footer }>
            <span> Є аккаунт? </span>
            <span onClick={ () => UnauthorizedRouter.navigate("/login") }> Увійти </span>
         </div>

      </motion.form>
   );
}

