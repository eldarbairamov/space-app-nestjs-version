import { Module } from "@nestjs/common";
import { NoteService } from "./note.service";
import { NoteController } from "./note.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Note, NoteSchema } from "./model/note.model";
import { NotePresenter } from "./presenter/note.presenter";
import { NoteRepository } from "./repository/note.repository";
import { UserRepository } from "@src/user/repository/user.repository";
import { UserModule } from "@src/user/user.module";
import { User, UserSchema } from "@src/user/model/user.model";

@Module( {

   imports: [ UserModule, MongooseModule.forFeature( [
      { name: Note.name, schema: NoteSchema },
      { name: User.name, schema: UserSchema },
   ] ) ],

   providers: [ NoteService, NotePresenter, UserRepository, NoteRepository ],

   controllers: [ NoteController ],

} )
export class NoteModule {

}