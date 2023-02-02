import * as nodemailer from "nodemailer";
import { config } from "../config";
import { ApiException } from "../error/api.exception";

export const emailSender = async (to: string, subject: string, message: string = "") => {

   const transporter = nodemailer.createTransport({
      service: "gmail",
      from: "no reply",
      auth: {
         user: config.EMAIL_SERVICE_USER,
         pass: config.EMAIL_SERVICE_PASS,
      },
   });

   return transporter
      .sendMail({
         to,
         subject,
         html: `
             <div> 
               <h2> Вітаємо! </h2>
               <p> ${ message } </p>
            </div>
            `,
      })
      .catch(() => {
         throw new ApiException("Помилка при надсиланні листа", 500);
      });
};