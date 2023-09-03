import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpStatus } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { User } from '../decorators/user.decorator';
import { User as UserPrisma } from '@prisma/client';
import { AuthGuard } from '../guards/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('cards')
@Controller('cards')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  @ApiOperation({ summary: "Create new card register" })
  @ApiResponse({ status: HttpStatus.CREATED, description: "Card created successfully" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request. Invalid input data." })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: "Conflict. Card with the same title already exists." })
  create(@Body() createCardDto: CreateCardDto, @User() user: UserPrisma) {
    return this.cardsService.create(createCardDto, user);
  }

  @Get()
  @ApiOperation({ summary: "Get all user cards registered" })
  @ApiResponse({ status: HttpStatus.OK, description: "Cards retrieved successfully" })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: "Forbidden. Access denied." })
  findAll(@User() user: UserPrisma) {
    return this.cardsService.findAll(user);
  }

  @Get(':id')
  @ApiOperation({ summary: "Get an user card by id" })
  @ApiResponse({ status: HttpStatus.OK, description: "Card retrieved successfully" })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Not Found. Card does not exist." })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: "Forbidden. Access denied." })
  @ApiParam({ name: "id", description: "card id", example: 1 })
  findOne(@Param('id') id: string, @User() user: UserPrisma) {
    return this.cardsService.findOne(Number(id), user);
  }

  @Delete(':id')
  @ApiOperation({ summary: "Delete an user card by id" })
  @ApiResponse({ status: HttpStatus.OK, description: "Card deleted successfully" })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Not Found. Card does not exist." })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: "Forbidden. Access denied." })
  @ApiParam({ name: "id", description: "card id", example: 1 })
  remove(@Param('id') id: string, @User() user: UserPrisma) {
    return this.cardsService.remove(Number(id), user);
  }
}
