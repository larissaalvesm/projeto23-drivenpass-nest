import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateCredentialDto } from "./dto/create-credential.dto";
import { User } from "@prisma/client";
import { CryptrUtil } from "../utils/cyptr.util";

@Injectable()
export class credentialsRepository {

    constructor(
        private readonly prisma: PrismaService,
        private readonly cryptrUtil: CryptrUtil) { }

    create(user: User, createCredentialDto: CreateCredentialDto) {
        return this.prisma.credential.create({
            data: {
                ...createCredentialDto,
                password: this.cryptrUtil.encrypt(createCredentialDto.password),
                user: {
                    connect: user
                }
            } 
        })
    }

    findAll(user: User) {
        return this.prisma.credential.findMany({
            where: {
                user
            }
        })
    }

    findOne(id: number) {
        return this.prisma.credential.findFirst({
            where: {
                id
            }
        })
        
    }

    findCredentialByTitle(title: string) {
        return this.prisma.credential.findFirst({
            where: {
                title
            }
        })
    }

    remove(id: number) {
        return this.prisma.credential.delete({
            where: {
                id
            }
        })
    }
}