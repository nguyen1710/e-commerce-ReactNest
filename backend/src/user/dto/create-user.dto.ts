import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDTO{
    @IsString()
    name: string;

    @IsEmail()
    email: string;


    @IsString()
    sdt: string;

    @IsString()
    @Length(6, 15)
    password: string;
}