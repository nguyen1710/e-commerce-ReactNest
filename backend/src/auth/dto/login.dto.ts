import {IsString, Length, IsEmail} from 'class-validator'
export class LoginDTO {
    @IsEmail()
    email: string

    @IsString()
    @Length(6, 22)
    password: string
}