import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'user@example.com', description: 'Email address for signing in' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'YourP@ssw0rd', description: 'Password for signing in' })
  password: string;
}