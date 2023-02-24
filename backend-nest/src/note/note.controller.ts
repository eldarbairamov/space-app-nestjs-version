import { Body, Controller, Delete, Get, Param, Put, Query, UseGuards } from "@nestjs/common";
import { NoteService } from "./note.service";
import { ObjectCheckingGuard } from "./guard/object-checking.guard";
import { CreateNoteDto } from "./dto";
import { AccessGuard } from "../auth/guard";
import { INoteResponse } from "./interface/note-response.interface";
import { User } from "../common/decorator/user.decorator";

@Controller("notes")
export class NoteController {

   constructor(private noteService: NoteService) {
   }

   // Add note
   @UseGuards(AccessGuard)
   @Get("add")
   async addNote(
      @User("userId") userId: string): Promise<INoteResponse> {

      return this.noteService.addNote(userId);
   }

   // Update note
   @UseGuards(AccessGuard)
   @UseGuards(ObjectCheckingGuard)
   @Put(":noteId")
   async updateNote(
      @Param("noteId") noteId: string,
      @Body() dto: CreateNoteDto): Promise<INoteResponse> {

      return this.noteService.updateNote(noteId, dto);
   }

   // Get all notes
   @UseGuards(AccessGuard)
   @Get()
   async getNotes(
      @Query('searchKey') searchKey: string,
      @User("userId") userId: string): Promise<INoteResponse[]> {

      return this.noteService.getNotes(userId, searchKey);
   }

   // Delete note
   @UseGuards(AccessGuard)
   @UseGuards(ObjectCheckingGuard)
   @Delete(":noteId")
   async deleteNote(
      @User("userId") userId: string,
      @Param("noteId") noteId: string): Promise<{ message: string }> {

      await this.noteService.deleteNote(noteId, userId);
      return { message: "Success" };
   }

}