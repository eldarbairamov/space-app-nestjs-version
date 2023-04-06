import { Body, Controller, Get, HttpCode, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { NoteService } from "./note.service";
import { ObjectCheckingGuard } from "./guard/object-checking.guard";
import { UpdateNoteDto } from "./dto";
import { INoteResponse, INotesResponse } from "./interface/note-response.interface";
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiDefaultResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { DefaultError, DeleteItemBody, NoteResponse, NotesResponse, ObjectIdError, ObjNotExistError, SuccessResponse, UnauthorizedError } from "@src/common/swagger";
import { DeleteItemDto, QueryDto } from "@src/common/dto";
import { AccessGuard } from "@src/auth/guard";
import { User } from "@src/common/decorator";

@ApiBearerAuth()
@ApiTags("Notes")
@Controller("notes")
export class NoteController {

   constructor(private noteService: NoteService) {
   }

   // Get all notes
   @ApiOperation({ summary: "get all notes" })
   @ApiUnauthorizedResponse({ description: "Unauthorized", type: UnauthorizedError })
   @ApiDefaultResponse({ description: "Unexpected errors", type: DefaultError })
   @ApiOkResponse({ description: "Success", type: NotesResponse })
   @UseGuards(AccessGuard)
   @Get()
   async getNotes(
      @Query() queryDto: QueryDto,
      @User("userId") userId: string): Promise<INotesResponse> {

      return this.noteService.getNotes(userId, queryDto);
   }

   // Add note
   @ApiOperation({ summary: "add note" })
   @ApiCreatedResponse({ description: "New note was created", type: NoteResponse })
   @ApiUnauthorizedResponse({ description: "Unauthorized", type: UnauthorizedError })
   @ApiDefaultResponse({ description: "Unexpected errors", type: DefaultError })
   @UseGuards(AccessGuard)
   @Get("add")
   async addNote(
      @User("userId") userId: string): Promise<INoteResponse> {

      return this.noteService.addNote(userId);
   }

   // Get note
   @ApiOperation({ summary: "get note by id" })
   @ApiParam({ name: "noteId", description: "note id", example: "63dfe16eda233c96fc6e2604" })
   @ApiOkResponse({ description: "Success", type: NoteResponse })
   @ApiUnauthorizedResponse({ description: "Unauthorized", type: UnauthorizedError })
   @ApiDefaultResponse({ description: "Unexpected errors", type: DefaultError })
   @ApiBadRequestResponse({ description: "Invalid ObjectID", type: ObjectIdError })
   @ApiNotFoundResponse({ description: "Not found", type: ObjNotExistError })
   @UseGuards(AccessGuard)
   @UseGuards(ObjectCheckingGuard)
   @Get(':noteId')
   async getNote(
      @Param('noteId') noteId: string) {
      return this.noteService.getNote(noteId)
   }

   // Update note
   @ApiOperation({ summary: "update note by id" })
   @ApiParam({ name: "noteId", description: "note id", example: "63dfe16eda233c96fc6e2604" })
   @ApiOkResponse({ description: "Success", type: SuccessResponse })
   @ApiUnauthorizedResponse({ description: "Unauthorized", type: UnauthorizedError })
   @ApiDefaultResponse({ description: "Unexpected errors", type: DefaultError })
   @ApiBadRequestResponse({ description: "Invalid ObjectID", type: ObjectIdError })
   @ApiNotFoundResponse({ description: "Not found", type: ObjNotExistError })
   @UseGuards(AccessGuard)
   @UseGuards(ObjectCheckingGuard)
   @Put(":noteId")
   async updateNote(
      @Param("noteId") noteId: string,
      @Body() dto: UpdateNoteDto): Promise<INoteResponse> {

      return this.noteService.updateNote(noteId, dto);
   }

   // Send prev request params and delete note
   @ApiOperation({ summary: "send prev request params and delete note by id" })
   @ApiParam({ name: "noteId", description: "note id", example: "63dfe16eda233c96fc6e2604" })
   @ApiBody({ type: DeleteItemBody, required: false })
   @ApiOkResponse({ description: "Success", type: NotesResponse })
   @ApiUnauthorizedResponse({ description: "Unauthorized", type: UnauthorizedError })
   @ApiDefaultResponse({ description: "Unexpected errors", type: DefaultError })
   @ApiBadRequestResponse({ description: "Invalid ObjectID", type: ObjectIdError })
   @ApiNotFoundResponse({ description: "Not found", type: ObjNotExistError })
   @HttpCode(200)
   @UseGuards(AccessGuard)
   @UseGuards(ObjectCheckingGuard)
   @Post(":noteId")
   async deleteNote(
      @User("userId") userId: string,
      @Body() dto: DeleteItemDto,
      @Param("noteId") noteId: string): Promise<INotesResponse> {

      return this.noteService.deleteNote(noteId, userId, dto.limit, dto.searchKey);
   }

}
