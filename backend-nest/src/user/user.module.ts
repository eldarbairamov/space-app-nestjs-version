import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./model/user.model";
import { UserController } from "./user.controller";
import { UserRepository } from "./repository/user.repository";
import { JwtModule } from "@nestjs/jwt";
import { MulterModule } from "@nestjs/platform-express";
import { ActionToken, ActionTokenSchema } from "../auth/model";
import { ConfigService } from "@nestjs/config";
import { fileStorage } from "@src/common/helper";
import { Note, NoteSchema } from "@src/note/model/note.model";
import { ActionTokenRepository } from "@src/auth/repository";
import { NoteRepository } from "@src/note/repository/note.repository";
import { Plan, PlanSchema } from "@src/plan/model/plan.model";
import { PlanRepository } from "@src/plan/repository/plan.repository";
import { Moment, MomentSchema } from "@src/moment/model/moment.model";
import { EmailService } from "@src/common/email.service";
import { MomentRepository } from "@src/moment/repository/moment.repository";
import { TokenService } from "@src/common/token.service";

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