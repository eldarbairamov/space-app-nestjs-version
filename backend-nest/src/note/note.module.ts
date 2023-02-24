import { Module } from "@nestjs/common";
import { NoteService } from "./note.service";
import { NoteController } from "./note.controller";
import { UserModule } from "../user/user.module";
import { MongooseModule } from "@nestjs/mongoose";
import { Note, NoteSchema } from "./model/note.model";
import { User, UserSchema } from "../user/model/user.model";
import { NotePresenter } from "./presenter/note.presenter";
import { UserRepository } from "../user/repository/user.repository";
import { NoteRepository } from "./repository/note.repository";

@Module({

   imports: [ UserModule, MongooseModule.forFeature([
      { name: Note.name, schema: NoteSchema },
      { name: User.name, schema: UserSchema },
   ]) ],

   providers: [ NoteService, NotePresenter, UserRepository, NoteRepository ],

   controllers: [ NoteController ],

})
export class NoteModule {

}