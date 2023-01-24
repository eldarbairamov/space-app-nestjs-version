import React, { type FC, useEffect, useState } from "react";

import { useNavigate, useSearchParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import applause from "../../../asset/applause.png";
import sad from "../../../asset/sad.png";
import { userService } from "../../../services";

import style from "./Email-Confirmation-Message.module.scss";

export const EmailConfirmationMessage: FC = () => {
   const [ status, setStatus ] = useState<string>("");

   const [ searchParams ] = useSearchParams();
   const confirmationToken = searchParams.get("token");

   const navigate = useNavigate();

   useEffect(() => {

      const emailConfirmation = async () => {
         await userService.changeEmail(confirmationToken!);
      };

      const loading = toast.loading("Зачекайте...");

      emailConfirmation()
         .then(res => {
            setStatus("valid");
            toast.dismiss(loading);

            setTimeout(() => {
               navigate("/login");
            }, 5000);
         })
         .catch(err => {
            setStatus("invalid");
            toast.dismiss(loading);

            setTimeout(() => {
               navigate("/login");
            }, 5000);
         });


   }, []);

   return (
      <>

         {/* Messages */ }
         { status === "valid"
            &&
            <div className={ style.EmailConfirmationMessage }>
               <div className={ style.message }>
                  <p> Ви успішно оновили адресу електронної пошти </p>
               </div>
               <img src={ applause } alt="applause"/>
            </div>
         }

         { status === "invalid"
            &&
            <div className={ style.EmailConfirmationMessage }>
               <div className={ style.message }>
                  <p> Вибачте, посилання більше не актуальне </p>
               </div>
               <img src={ sad } alt="applause"/>
            </div>
         }

      </>
   );
};
