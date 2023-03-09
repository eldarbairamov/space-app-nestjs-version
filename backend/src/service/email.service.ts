import nodemailer from "nodemailer";
import { configuration } from "../config";
import { ApiException } from "../exception/api.exception";
import hbs from "nodemailer-express-handlebars";
import path from "node:path";
import { emailTemplate } from "../email-template/email-template";
import { EmailActionType } from "../type/email-action.type";

export const emailSender = async (to: string, emailAction: EmailActionType, context: any) => {
   const template = emailTemplate[emailAction];

   const transporter = nodemailer.createTransport({
      service: "gmail",
      from: "no reply",
      auth: {
         user: configuration.EMAIL_SERVICE_USER,
         pass: configuration.EMAIL_SERVICE_PASS,
      },
   });

   transporter.use("compile", hbs({
      viewEngine: {
         defaultLayout: "main",
         layoutsDir: path.join(__dirname, "..", "email-template", "layout"),
         partialsDir: path.join(__dirname, "..", "email-template", "partial"),
         extname: ".hbs",
      },
      extName: ".hbs",
      viewPath: path.join(__dirname, "..", "email-template", "view"),
   }));

   const mail = {
      to,
      subject: template.subject,
      template: template.templateName,
      context,
   };

   return transporter
      .sendMail(mail)
      .catch((e) => {
         const error = e as Error;
         console.log(error.message);
         throw new ApiException("Nodemailer: Error", 500);
      });
};