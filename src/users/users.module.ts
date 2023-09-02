import { Global, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersRepository } from './users.repository';

@Global()
@Module({
  imports: [JwtModule.register({
    secret: process.env.JWT_SECRET
  })],
  providers: [UsersService, UsersRepository],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule {}
