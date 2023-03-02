import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { MongooseModule } from "@nestjs/mongoose";
import { NoteModule } from "./note/note.module";
import { UserModule } from "./user/user.module";
import { PlanModule } from "./plan/plan.module";
import { TaskModule } from "./task/task.module";
import { ConfigModule } from "@nestjs/config";
import { MomentModule } from "./moment/moment.module";
import { ScheduleModule } from "@nestjs/schedule";
import configuration from "./config/configuration";

@Module({
   imports: [
      MongooseModule.forRoot("mongodb://localhost:27017/space-app-nestjs"),
      ConfigModule.forRoot({ load: [ configuration ] }),
      ScheduleModule.forRoot(),
      AuthModule, NoteModule, UserModule, PlanModule, TaskModule, MomentModule,
   ],
})
export class AppModule {
}