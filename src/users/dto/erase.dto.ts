import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class EraseDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'YourP@ssw0rd', description: 'Password for signing in' })
    password: string;
}