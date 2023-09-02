import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { CredentialsModule } from './credentials/credentials.module';
import { NotesModule } from './notes/notes.module';

@Module({
  imports: [PrismaModule, UsersModule, CredentialsModule, NotesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
