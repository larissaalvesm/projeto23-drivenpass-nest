import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { UsersRepository } from '../users/users.repository';
import { NotesRepository } from './notes.repository';

@Module({
  controllers: [NotesController],
  providers: [NotesService, UsersRepository, NotesRepository],
})
export class NotesModule {}
