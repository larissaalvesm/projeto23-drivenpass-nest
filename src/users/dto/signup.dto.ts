import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class SignUpDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;
  
    @IsNotEmpty()
    @IsStrongPassword({
        minLength: 10,
        minNumbers: 1,
        minUppercase: 1,
        minLowercase: 1,
        minSymbols: 1,
      },
      {
        message: `Password is not strong enough. Must contain: 10 characters, 1 number, 1 uppercase letter, 1 lowercase letter, 1 symbol`,
      })
    password: string;
  }