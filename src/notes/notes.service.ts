import { ForbiddenException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { User } from '@prisma/client';
import { NotesRepository } from './notes.repository';

@Injectable()
export class NotesService {

  constructor(private readonly notesRepository: NotesRepository) { }

  async create(user: User, createNoteDto: CreateNoteDto) {
    const note = await this.notesRepository.findNoteByTitle(createNoteDto.title);
    if (note) {
      throw new HttpException("Note title already registered", HttpStatus.CONFLICT);
    }
    return await this.notesRepository.create(user, createNoteDto);
  }

  async findAll(user: User) {
    return await this.notesRepository.findAll(user);
  }

  async findOne(id: number, user: User) {
    const note = await this.notesRepository.findOne(id);
    if (!note) {
      throw new NotFoundException("Note not found.")
    }
    if (note.userId !== user.id) {
      throw new ForbiddenException("Note belongs to another user.")
    }

    return note;
  }

  async remove(id: number, user: User) {
    const note = await this.notesRepository.findOne(id);
    if (!note) {
      throw new NotFoundException("Note not found.")
    }
    if (note.userId !== user.id) {
      throw new ForbiddenException("Note belongs to another user.")
    }

    return await this.notesRepository.remove(id);
  }
}
