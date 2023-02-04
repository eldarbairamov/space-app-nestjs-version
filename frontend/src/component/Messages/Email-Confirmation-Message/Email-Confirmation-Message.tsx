import React, { type FC, useEffect, useState } from "react";

import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { userService } from "../../../services";

import sad from "../../../asset/sad.png";
import applause from "../../../asset/applause.png";
import style from "./Email-Confirmation-Message.module.scss";

export const EmailConfirmationMessage: FC = () => {
   const [ status, setStatus ] = useState<string>("");

   const [ searchParams ] = useSearchParams();
   const confirmationToken = searchParams.get("token");

   const navigate = useNavigate();

   useEffect(() => {
      const loading = toast.loading("Зачекайте...");

      userService.changeEmail(confirmationToken!)
         .then(() => {
            setStatus("valid");
            toast.dismiss(loading);

            setTimeout(() => {
               navigate("/login");
            }, 2000);
         })
         .catch(() => {
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
