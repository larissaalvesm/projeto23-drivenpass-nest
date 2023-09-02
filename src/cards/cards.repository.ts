import { Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CryptrUtil } from '../utils/cyptr.util';
import { User } from '@prisma/client';

@Injectable()
export class CardsRepository {

    constructor(
        private readonly prisma: PrismaService,
        private readonly cryptrUtil: CryptrUtil) { }

    create(user: User,createCardDto: CreateCardDto) {
        return this.prisma.card.create({
            data: {
                ...createCardDto,
                passwordCard: this.cryptrUtil.encrypt(createCardDto.passwordCard),
                user: {
                    connect: user
                }
            } 
        })
    }

    findAll(user: User) {
        return this.prisma.card.findMany({
            where: {
                user
            }
        })
    }

    findOne(id: number) {
        return this.prisma.card.findFirst({
            where: {
                id
            }
        })
        
    }

    findCardByTitle(title: string) {
        return this.prisma.card.findFirst({
            where: {
                title
            }
        })
    }

    remove(id: number) {
        return this.prisma.card.delete({
            where: {
                id
            }
        })
    }
}