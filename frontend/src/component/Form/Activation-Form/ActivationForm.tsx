import React, { ChangeEvent, FC, FormEvent, useState } from "react";

import style from "./ActivationForm.module.scss";

interface ActivationFormProps {
   activationFn: (body: string) => Promise<void>;
}

export const ActivationForm: FC<ActivationFormProps> = ({ activationFn }) => {
   const [ value, setValue ] = useState<string>("");

   const handleChange = (value: string) => setValue(value);

   const handleSubmit = async (e: FormEvent<HTMLButtonElement>) => {
      e.preventDefault();
      await activationFn(value);
   };

   return (
      <div className={ style.ActivationForm }>

         {/* Message */ }
         <p className={ style.message }> Будь ласка, введіть код активації </p>

         {/* Input */ }
         <div className={ style.input_field }>
            <input type="text"
                   value={ value }
                   onChange={ (e: ChangeEvent<HTMLInputElement>) => handleChange(e.target.value) }/>
         </div>

         {/* Submit button */ }
         <button disabled={ !value }
                 onClick={ (e: FormEvent<HTMLButtonElement>) => handleSubmit(e) }> Надіслати
         </button>

      </div>
   );
};