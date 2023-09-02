import { IsNotEmpty, IsString } from "class-validator";

export class CreateNoteDto {
    @IsNotEmpty()
    @IsString()
    text: string;
  
    @IsNotEmpty()
    @IsString()
    title: string;
  }

