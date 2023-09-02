import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NotesRepository {

constructor(private readonly prisma: PrismaService) { }

  create(user: User, createNoteDto: CreateNoteDto) {
    return this.prisma.note.create({
        data: {
            ...createNoteDto,
            user: {
                connect: user
            }
        } 
    })
  }

  findAll(user: User) {
    return this.prisma.note.findMany({
        where: {
            user
        }
    })
  }

  findOne(id: number) {
    return this.prisma.note.findFirst({
        where: {
            id
        }
    })
  }

  findNoteByTitle(title: string) {
    return this.prisma.note.findFirst({
        where: {
            title
        }
    })
}

  remove(id: number) {
    return this.prisma.note.delete({
        where: {
            id
        }
    })
  }
}