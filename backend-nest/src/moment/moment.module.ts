import { Module } from "@nestjs/common";
import { MomentController } from "./moment.controller";
import { MomentService } from "./moment.service";
import { MomentRepository } from "./repository/moment.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { Moment, MomentSchema } from "./model/moment.model";
import { User, UserSchema } from "../user/model/user.model";
import { UserRepository } from "../user/repository/user.repository";
import { MomentPresenter } from "./presenter/moment.presenter";
import { MulterModule } from "@nestjs/platform-express";
import { fileStorage } from "../common/helper/file-storage";

@Module({
   imports: [ MongooseModule.forFeature([
      { name: Moment.name, schema: MomentSchema },
      { name: User.name, schema: UserSchema },
   ]),
      MulterModule.register(fileStorage)
   ],
   providers: [ MomentService, MomentRepository, UserRepository, MomentPresenter ],
   controllers: [ MomentController ],
})
export class MomentModule {
}