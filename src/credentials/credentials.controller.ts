import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpStatus } from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { AuthGuard } from '../guards/auth.guard';
import { User } from '../decorators/user.decorator';
import { User as UserPrisma } from '@prisma/client';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('credentials')
@Controller('credentials')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class CredentialsController {
  constructor(private readonly credentialsService: CredentialsService) {}

  @Post()
  @ApiOperation({ summary: "Create new credential register" })
  @ApiResponse({ status: HttpStatus.CREATED, description: "Credential created successfully" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request. Invalid input data." })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: "Conflict. Credential with the same title already exists." })
  create(@Body() createCredentialDto: CreateCredentialDto, @User() user: UserPrisma) {
    return this.credentialsService.create(user, createCredentialDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all user credentials registered" })
  @ApiResponse({ status: HttpStatus.OK, description: "Credentials retrieved successfully" })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: "Forbidden. Access denied." })
  findAll(@User() user: UserPrisma) {
    return this.credentialsService.findAll(user);
  }

  @Get(':id')
  @ApiOperation({ summary: "Get an user credential by id" })
  @ApiParam({ name: "id", description: "credential id", example: 1 })
  @ApiResponse({ status: HttpStatus.OK, description: "Credential retrieved successfully" })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Not Found. Credential does not exist." })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: "Forbidden. Access denied." })
  findOne(@Param('id') id: string, @User() user: UserPrisma) {
    return this.credentialsService.findOne(Number(id), user);
  }

  @Delete(':id')
  @ApiOperation({ summary: "Delete an user credential by id" })
  @ApiParam({ name: "id", description: "credential id", example: 1 })
  @ApiResponse({ status: HttpStatus.OK, description: "Credential deleted successfully" })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Not Found. Credential does not exist." })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: "Forbidden. Access denied." })
  remove(@Param('id') id: string, @User() user: UserPrisma) {
    return this.credentialsService.remove(Number(id), user);
  }
}
