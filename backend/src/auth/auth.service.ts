import { Injectable, UnauthorizedException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt'
import { UserService } from 'src/user/user.service';
import {LoginDTO} from './dto/login.dto'
import bcrypt from 'node_modules/bcryptjs';
@Injectable()
export class AuthService {
    constructor (
        private readonly userService: UserService,
        // private readonly jwtService: JwtService,
    ){}

    async login(user: LoginDTO){
        const {email, password} = user
        try{
            const user = await this.userService.findByEmail(email)
            if(!user) {
                throw new UnauthorizedException('Email not found')
            }
            const isMatch = await bcrypt.compare(password, user.password)
            // console.log(isMatch + hashedPassword + "," + user.password)
            if(!isMatch) {
                throw new UnauthorizedException('Password invalid')
            }

            // const payload = { sub: user.id, username: user.name };
            // return {
            //     access_token: await this.jwtService.signAsync(payload),
            // };
            return user
        }catch(error) {
            throw new Error('Lỗi đăng nhập: ' + error.message)
        }
    }
}
