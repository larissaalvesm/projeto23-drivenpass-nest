import { Controller, Get, Post, Body, Param, Delete, UseGuards, HttpStatus } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { AuthGuard } from '../guards/auth.guard';
import { User } from '../decorators/user.decorator';
import { User as UserPrisma } from '@prisma/client';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('notes')
@Controller('notes')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  @ApiOperation({ summary: "Create new note register" })
  @ApiResponse({ status: HttpStatus.CREATED, description: "Note created successfully" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request. Invalid input data." })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: "Conflict. Note with the same title already exists." })
  create(@Body() createNoteDto: CreateNoteDto, @User() user: UserPrisma) {
    return this.notesService.create(user, createNoteDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all user notes registered" })
  @ApiResponse({ status: HttpStatus.OK, description: "Notes retrieved successfully" })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: "Forbidden. Access denied." })
  findAll(@User() user: UserPrisma) {
    return this.notesService.findAll(user);
  }

  @Get(':id')
  @ApiOperation({ summary: "Get an user note by id" })
  @ApiParam({ name: "id", description: "note id", example: 1 })
  @ApiResponse({ status: HttpStatus.OK, description: "Note retrieved successfully" })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Not Found. Note does not exist." })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: "Forbidden. Access denied." })
  findOne(@Param('id') id: string, @User() user: UserPrisma) {
    return this.notesService.findOne(Number(id), user);
  }

  @Delete(':id')
  @ApiOperation({ summary: "Delete an user note by id" })
  @ApiParam({ name: "id", description: "note id", example: 1 })
  @ApiResponse({ status: HttpStatus.OK, description: "Note deleted successfully" })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Not Found. Note does not exist." })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: "Forbidden. Access denied." })
  remove(@Param('id') id: string, @User() user: UserPrisma) {
    return this.notesService.remove(Number(id), user);
  }
}
