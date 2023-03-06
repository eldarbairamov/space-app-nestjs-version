import React, { ChangeEvent, FormEvent, useState } from "react";

import { Input, Button } from "../../../component";

import style from "./ActivationForm.module.scss";

interface ActivationFormProps {
   activationFn: (body: string) => Promise<void>;
}

export function ActivationForm({ activationFn }: ActivationFormProps) {
   const [ value, setValue ] = useState<string>("");

   const handleChange = (value: string) => setValue(value);

   const handleSubmit = async (e: FormEvent<HTMLButtonElement>) => {
      e.preventDefault();
      await activationFn(value);
   };

   return (
      <div className={ style.ActivationForm }>

         {/* Message */ }
         <span className={ style.message }> Будь ласка, введіть код активації </span>

         {/* Input */ }
         <Input type="text"
                value={ value }
                onChange={ (e: ChangeEvent<HTMLInputElement>) => handleChange(e.target.value) }/>


         {/* Submit button */ }
         <Button disabled={ !value }
                 text={ "Надіслати" }
                 style={ { width: "100%" } }
                 onClick={ (e: FormEvent<HTMLButtonElement>) => handleSubmit(e) }
         />

      </div>
   );
}