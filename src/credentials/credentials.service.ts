import { ForbiddenException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { credentialsRepository } from './credentials.repository';
import { User } from '@prisma/client';
import { CryptrUtil } from '../utils/cyptr.util';

@Injectable()
export class CredentialsService {

  constructor(
    private readonly credentialsRepository: credentialsRepository,
    private readonly cryptrUtil: CryptrUtil) { }

  async create(user: User, createCredentialDto: CreateCredentialDto) {
    const credential = await this.credentialsRepository.findCredentialByTitle(createCredentialDto.title);
    if (credential) {
      throw new HttpException("Credential title already registered", HttpStatus.CONFLICT);
    }
    return await this.credentialsRepository.create(user, createCredentialDto);
  }

  async findAll(user: User) {
    const credentials = await this.credentialsRepository.findAll(user);

    const decryptedCredentials = credentials.map((c) => {
      return {
        ...c,
        password: this.cryptrUtil.decrypt(c.password),
      }
    });

    return decryptedCredentials;
  }

  async findOne(id: number, user: User) {
    const credential = await this.credentialsRepository.findOne(id);
    if (!credential) {
      throw new NotFoundException("Credential not found.")
    }
    if (credential.userId !== user.id) {
      throw new ForbiddenException("Credential belongs to another user.")
    }

    const decryptedCredential = {
      ...credential,
      password: this.cryptrUtil.decrypt(credential.password),
    }

    return decryptedCredential;
  }

  async remove(id: number, user: User) {
    const credential = await this.credentialsRepository.findOne(id);
    if (!credential) {
      throw new NotFoundException("Credential not found.")
    }
    if (credential.userId !== user.id) {
      throw new ForbiddenException("Credential belongs to another user.")
    }

    return await this.credentialsRepository.remove(id);
  }
}
