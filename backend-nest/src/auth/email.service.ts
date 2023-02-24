import * as nodemailer from "nodemailer";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { EmailActionType } from "../common/type/email-action.type";
import { emailTemplate } from "../common/email-template/email-template";
import * as hbs from "nodemailer-express-handlebars";
import * as path from "node:path";

@Injectable()
export class EmailService {

   async send(to: string, emailAction: EmailActionType, context: any) {
      const template = emailTemplate[emailAction];

      const transporter = nodemailer.createTransport({
         service: "gmail",
         from: "no reply",
         auth: {
            user: process.env.EMAIL_SERVICE_USER,
            pass: process.env.EMAIL_SERVICE_PASS,
         },
      });

      transporter.use("compile", hbs({
         viewEngine: {
            defaultLayout: "main",
            layoutsDir: path.join(__dirname, "..", "common", "email-template", "layout"),
            partialsDir: path.join(__dirname, "..", "common", "email-template", "partial"),
            extname: ".hbs",
         },
         extName: ".hbs",
         viewPath: path.join(__dirname, "..", "common", "email-template", "view"),
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
            console.log(e);
            throw new HttpException("Nodemailer: Error", HttpStatus.INTERNAL_SERVER_ERROR);
         });

   };
}