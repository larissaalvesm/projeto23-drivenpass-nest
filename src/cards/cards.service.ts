import { ForbiddenException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { CardsRepository } from './cards.repository';
import { CryptrUtil } from '../utils/cyptr.util';
import { User } from '@prisma/client';

@Injectable()
export class CardsService {

  constructor(
    private readonly cardsRepository: CardsRepository,
    private readonly cryptrUtil: CryptrUtil) { }

  async create(createCardDto: CreateCardDto, user: User) {
    const card = await this.cardsRepository.findCardByTitle(createCardDto.title);
    if (card) {
      throw new HttpException("Card title already registered", HttpStatus.CONFLICT);
    }
    return await this.cardsRepository.create(user, createCardDto);
  }

  async findAll(user: User) {
    const cards = await this.cardsRepository.findAll(user);

    const decryptedCards = cards.map((c) => {
      return {
        ...c,
        passwordCard: this.cryptrUtil.decrypt(c.passwordCard),
      }
    });

    return decryptedCards;
  }

  async findOne(id: number, user: User) {
    const card = await this.cardsRepository.findOne(id);
    if (!card) {
      throw new NotFoundException("Card not found.")
    }
    if (card.userId !== user.id) {
      throw new ForbiddenException("Card belongs to another user.")
    }

    const decryptedCard = {
      ...card,
      passwordCard: this.cryptrUtil.decrypt(card.passwordCard),
    }

    return decryptedCard;
  }

  async remove(id: number, user: User) {
    const card = await this.cardsRepository.findOne(id);
    if (!card) {
      throw new NotFoundException("Card not found.")
    }
    if (card.userId !== user.id) {
      throw new ForbiddenException("Card belongs to another user.")
    }

    return await this.cardsRepository.remove(id);
  }
}
