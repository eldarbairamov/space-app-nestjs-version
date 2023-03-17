import nodemailer from "nodemailer";
import { configuration } from "../config";
import { ApiException } from "../exception/api.exception";
import hbs from "nodemailer-express-handlebars";
import path from "node:path";
import { emailTemplate } from "../email-template/email-template";
import { EmailActionType } from "../type/email-action.type";
import { EMAIL_TEMPLATES_PATH } from "../constant/email-templates-path.constant";

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
         layoutsDir: path.join(EMAIL_TEMPLATES_PATH, "layout"),
         partialsDir: path.join(EMAIL_TEMPLATES_PATH, "partial"),
         extname: ".hbs",
      },
      extName: ".hbs",
      viewPath: path.join(EMAIL_TEMPLATES_PATH, "view"),
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