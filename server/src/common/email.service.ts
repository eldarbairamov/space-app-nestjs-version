import nodemailer from "nodemailer";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { EmailActionType } from "./type/email-action.type";
import { emailTemplate } from "./email-template/email-template";
import hbs from "nodemailer-express-handlebars";
import path from "node:path";
import { ConfigService } from "@nestjs/config";
import { IEnvironmentVariables } from "@src/config/env-variables.interface";

@Injectable()
export class EmailService {

   constructor( private configService: ConfigService<IEnvironmentVariables> ) {
   }

   async send( to: string, emailAction: EmailActionType, context: any ) {
      const template = emailTemplate[emailAction];

      const transporter = nodemailer.createTransport( {
         service: "gmail",
         from: "no reply",
         auth: {
            user: this.configService.get( "EMAIL_SERVICE_USER" ),
            pass: this.configService.get( "EMAIL_SERVICE_PASS" ),
         },
      } );

      transporter.use( "compile", hbs( {
         viewEngine: {
            defaultLayout: "main",
            layoutsDir: path.join( __dirname, "..", "common", "email-template", "layout" ),
            partialsDir: path.join( __dirname, "..", "common", "email-template", "partial" ),
            extname: ".hbs",
         },
         extName: ".hbs",
         viewPath: path.join( __dirname, "..", "common", "email-template", "view" ),
      } ) );

      const mail = {
         to,
         subject: template.subject,
         template: template.templateName,
         context,
      };

      return transporter
          .sendMail( mail )
          .catch( ( e ) => {
             console.log( e );
             throw new HttpException( "Nodemailer: Error", HttpStatus.INTERNAL_SERVER_ERROR );
          } );

   };
}