import {  CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Types } from "mongoose";
import { NoteRepository } from "@src/note/repository/note.repository";

@Injectable()
export class ObjectCheckingGuard implements CanActivate {

   constructor(private noteRepository: NoteRepository) {
   }

   async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const noteId = request.params.noteId;

      if (!Types.ObjectId.isValid(noteId)) throw new HttpException("Object ID is not valid", HttpStatus.BAD_REQUEST);

      const isObjectExists = await this.noteRepository.findById(noteId);
      if (!isObjectExists) throw new HttpException("Object does not exist", HttpStatus.NOT_FOUND);

      return true;
   }
}