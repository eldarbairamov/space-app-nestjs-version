import { BadRequestException, CanActivate, ExecutionContext, Injectable, NotFoundException } from "@nestjs/common";
import { Types } from "mongoose";
import { NoteRepository } from "../repository/note.repository";

@Injectable()
export class ObjectCheckingGuard implements CanActivate {

   constructor(private noteRepository: NoteRepository) {
   }

   async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const noteId = request.params.noteId;

      if (!Types.ObjectId.isValid(noteId)) throw new BadRequestException({ message: "Object ID is not valid" });

      const isObjectExists = await this.noteRepository.findById(noteId);
      if (!isObjectExists) throw new NotFoundException({ message: "Object does not exist" });

      return true;
   }
}