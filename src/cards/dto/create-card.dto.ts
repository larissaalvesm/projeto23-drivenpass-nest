import { IsBoolean, IsIn, IsNotEmpty, IsString, Length, Matches } from "class-validator";

import { ApiProperty } from '@nestjs/swagger';

export class CreateCardDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'John Curty', description: 'Card issuer' })
  cardIssuer: string;

  @IsNotEmpty()
  @IsString()
  @Length(16, 16, { message: 'cardDigits must have exactly 16 characters' })
  @ApiProperty({ example: '1234567890123456', description: '16-digit card number' })
  cardDigits: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 4, { message: 'cvv must have at least 3 and at most 4 characters' })
  @ApiProperty({ example: '123', description: 'CVV code' })
  cvv: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^\d{2}\/\d{2}$/, { message: 'expirationDate must be in the format "mm/yy"' })
  @ApiProperty({ example: '12/24', description: 'Expiration date in "mm/yy" format' })
  expirationDate: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'password123', description: 'Card password' })
  passwordCard: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(['crédito', 'débito', 'ambos'], { message: 'type must be one of the options: crédito, débito, ambos' })
  @ApiProperty({ example: 'crédito', description: 'Type of card (crédito, débito, ambos)' })
  type: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Credit Card Nacional Bank', description: 'Title for the card' })
  title: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({ example: true, description: 'Is it a virtual card?' })
  virtualCard: boolean;
}
