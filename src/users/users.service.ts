import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from "bcrypt";
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {

    private EXPIRATION_TIME = "7 days";
    private ISSUER = "DrivenPass";
    private AUDIENCE = "users";

    constructor(
        private readonly jwtService: JwtService,
        private readonly usersRepository: UsersRepository) { }

    async signUp(signUpDto: SignUpDto) {
        const { email } = signUpDto;
        const user = await this.usersRepository.getUserByEmail(email);
        if (user) throw new ConflictException("E-mail already registered.");

        return await this.usersRepository.create(signUpDto);
    }

    async signIn(signInDto: SignInDto) {
        const { email, password } = signInDto;
        const user = await this.usersRepository.getUserByEmail(email);
        if (!user) throw new UnauthorizedException("Email or password not valid.");

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) throw new UnauthorizedException("Email or password not valid.");

        return this.createToken(user);
    }

    createToken(user: User) {
        const { id, email } = user;

        const token = this.jwtService.sign({ email }, {
            expiresIn: this.EXPIRATION_TIME,
            subject: String(id),
            issuer: this.ISSUER,
            audience: this.AUDIENCE
        })

        return { token };
    }

    checkToken(token: string) {
        const data = this.jwtService.verify(token, {
            audience: this.AUDIENCE,
            issuer: this.ISSUER
        });

        return data;
    }
       
    async erase(password: string, user: { id: number; email: string; password: string; }) {
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) throw new UnauthorizedException("Password not valid.");

        await this.usersRepository.eraseUser(user.id);
    }
}
