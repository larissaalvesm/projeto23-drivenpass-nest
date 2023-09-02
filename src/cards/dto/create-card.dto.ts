import { IsBoolean, IsIn, IsNotEmpty, IsString, Length, Matches } from "class-validator";

export class CreateCardDto {
    @IsNotEmpty()
    @IsString()
    cardIssuer: string;
  
    @IsNotEmpty()
    @IsString()
    @Length(16, 16, { message: 'cardDigits must have exactly 16 characters' })
    cardDigits: string;
  
    @IsNotEmpty()
    @IsString()
    @Length(3, 4, { message: 'cvv must have at least 3 and at most 4 characters' })
    cvv: string;
  
    @IsNotEmpty()
    @IsString()
    @Matches(/^\d{2}\/\d{2}$/, { message: 'expirationDate must be in the format "mm/yy"' })
    expirationDate: string;

    @IsNotEmpty()
    @IsString()
    passwordCard: string;

    @IsNotEmpty()
    @IsString()
    @IsIn(['crédito', 'débito', 'ambos'], { message: 'type must be one of the options: crédito, débito, ambos' })
    type: string;

    @IsNotEmpty()
    @IsString()
    title : string;

    @IsNotEmpty()
    @IsBoolean()
    virtualCard: boolean;
}
