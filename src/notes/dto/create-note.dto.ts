import { IsNotEmpty, IsString } from "class-validator";

import { ApiProperty } from '@nestjs/swagger';

export class CreateNoteDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Remember to call John tomorrow.', description: 'Text of the note' })
  text: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Important Reminder', description: 'Title of the note' })
  title: string;
}

