import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { CardsRepository } from './cards.repository';
import { UsersRepository } from '../users/users.repository';
import { CryptrUtil } from '../utils/cyptr.util';

@Module({
  controllers: [CardsController],
  providers: [CardsService, CardsRepository, UsersRepository, CryptrUtil],
})
export class CardsModule {}
