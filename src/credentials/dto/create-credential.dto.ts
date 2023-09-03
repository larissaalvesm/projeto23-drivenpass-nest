import { IsNotEmpty, IsString, IsUrl } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateCredentialDto {
  @IsNotEmpty()
  @IsUrl()
  @ApiProperty({ example: 'https://www.facebook.com', description: 'URL for the credential' })
  url: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'username123', description: 'Username for the credential' })
  username: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'password123', description: 'Password for the credential' })
  password: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Facebook', description: 'Title for the credential' })
  title: string;
}
