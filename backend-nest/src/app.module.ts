import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { MongooseModule } from "@nestjs/mongoose";
import { NoteModule } from "./note/note.module";
import { UserModule } from "./user/user.module";
import { PlanModule } from "./plan/plan.module";
import { TaskModule } from "./task/task.module";
import { ConfigModule } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { MomentModule } from "./moment/moment.module";
import * as path from "node:path";

@Module({
   imports: [
      MongooseModule.forRoot("mongodb://localhost:27017/nestjs"),
      ConfigModule.forRoot({ envFilePath: ".env" }),
      ServeStaticModule.forRoot({
         rootPath: path.join(__dirname, "upload"),
      }),
      AuthModule, NoteModule, UserModule, PlanModule, TaskModule, MomentModule,
   ],
})
export class AppModule {
}