import { Injectable} from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersRepository {
  private SALT = 10;
  constructor(private readonly prisma: PrismaService) { }

  create(userDto: SignUpDto) {
    return this.prisma.user.create({
      data: {
        ...userDto,
        password: bcrypt.hashSync(userDto.password, this.SALT)
      }
    })
  }

  getById(id: number) {
    return this.prisma.user.findUnique({
      where: { id }
    })
  }

  getUserByEmail(email: string) {
    return this.prisma.user.findFirst({
      where: { email }
    })
  }

  eraseUser(userId: number) {
    return this.prisma.$transaction([
      this.prisma.credential.deleteMany({ where: { userId } }),
      this.prisma.note.deleteMany({ where: { userId } }),
      this.prisma.card.deleteMany({ where: { userId } }),
      this.prisma.user.delete({ where: { id: userId } }),
    ]);
}
}