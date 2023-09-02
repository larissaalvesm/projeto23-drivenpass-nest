import { Module } from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import { CredentialsController } from './credentials.controller';
import { credentialsRepository } from './credentials.repository';
import { CryptrUtil } from '../utils/cyptr.util';
import { UsersRepository } from '../users/users.repository';

@Module({
  controllers: [CredentialsController],
  providers: [CredentialsService, credentialsRepository, CryptrUtil, UsersRepository],
})
export class CredentialsModule {}
