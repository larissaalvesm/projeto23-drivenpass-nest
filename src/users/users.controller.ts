import { Body, Controller, Delete, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { EraseDto } from './dto/erase.dto';
import { AuthGuard } from '../guards/auth.guard';
import { User } from '../decorators/user.decorator';
import { User as UserPrisma } from '@prisma/client';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {

constructor(private readonly usersService: UsersService) { }

@Post("/sign-up")
@ApiOperation({ summary: "Create new user" })
@ApiResponse({ status: HttpStatus.CREATED, description: "User created successfully" })
@ApiResponse({ status: HttpStatus.CONFLICT, description: "Conflict. Email is already in use." })
@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request. Invalid input data." })
signUp(@Body() signUpDto: SignUpDto) {
  return this.usersService.signUp(signUpDto);
}

@Post("/sign-in")
@HttpCode(HttpStatus.OK)
@ApiOperation({ summary: "User can sign-in" })
@ApiResponse({ status: HttpStatus.OK, description: "Sign-in successful" })
@ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized. Invalid email or password." })
signIn(@Body() signInDto: SignInDto) {
  return this.usersService.signIn(signInDto);
}

@Delete("/erase")
@ApiOperation({ summary: "Delete user" })
@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiResponse({ status: HttpStatus.OK, description: "User deleted successfully" })
@ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized. Invalid password." })
erase(@Body() eraseDto: EraseDto, @User() user: UserPrisma) {
  return this.usersService.erase(eraseDto.password, user)
}
}
