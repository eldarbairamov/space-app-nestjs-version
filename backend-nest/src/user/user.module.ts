import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./model/user.model";
import { UserController } from "./user.controller";
import { UserRepository } from "./repository/user.repository";
import { JwtModule } from "@nestjs/jwt";
import { MulterModule } from "@nestjs/platform-express";
import { fileStorage } from "../common/helper";
import { ActionToken, ActionTokenSchema } from "../auth/model";
import { ActionTokenRepository } from "../auth/repository";
import { MomentRepository } from "../moment/repository/moment.repository";
import { PlanRepository } from "../plan/repository/plan.repository";
import { NoteRepository } from "../note/repository/note.repository";
import { Moment, MomentSchema } from "../moment/model/moment.model";
import { Plan, PlanSchema } from "../plan/model/plan.model";
import { Note, NoteSchema } from "../note/model/note.model";
import { ConfigService } from "@nestjs/config";
import { EmailService } from "../common/email.service";
import { TokenService } from "../common/token.service";

@Module({

   imports: [
      MongooseModule.forFeature([
         { name: User.name, schema: UserSchema },
         { name: ActionToken.name, schema: ActionTokenSchema },
         { name: Moment.name, schema: MomentSchema },
         { name: Plan.name, schema: PlanSchema },
         { name: Note.name, schema: NoteSchema },
      ]),
      JwtModule.register({}),
      MulterModule.register(fileStorage),
   ],

   providers: [ UserService, UserRepository, ActionTokenRepository, EmailService, MomentRepository, PlanRepository, NoteRepository, TokenService, ConfigService ],
   controllers: [ UserController ],
   exports: [ UserService ],

})
export class UserModule {

}