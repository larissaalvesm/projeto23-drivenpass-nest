import { Body, Controller, Delete, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { EraseDto } from './dto/erase.dto';
import { AuthGuard } from '../guards/auth.guard';
import { User } from '../decorators/user.decorator';
import { User as UserPrisma } from '@prisma/client';

@Controller('users')
export class UsersController {

constructor(private readonly usersService: UsersService) { }

  @Post("/sign-up")
  signUp(@Body() signUpDto: SignUpDto) {
    return this.usersService.signUp(signUpDto);
  }

  @Post("/sign-in")
  @HttpCode(HttpStatus.OK)
  signIn(@Body() signInDto: SignInDto) {
    return this.usersService.signIn(signInDto);
  }

  @Delete("/erase")
  @UseGuards(AuthGuard)
  erase(@Body() eraseDto: EraseDto, @User() user: UserPrisma){
    return this.usersService.erase(eraseDto.password, user)
  }
}
