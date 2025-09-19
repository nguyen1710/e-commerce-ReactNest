import { Controller, Post, Body , HttpStatus, HttpCode, Get, UsePipes, ValidationPipe} from '@nestjs/common';
import {CreateUserDTO} from './dto/create-user.dto'
import {UserService} from './user.service'
import { User } from './user.entity';
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    
    @Post('signup')
    @HttpCode(HttpStatus.CREATED) // 201 Created
    @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    async create(@Body() user: CreateUserDTO) {
        const newUser = await this.userService.create(user);
        return {
        status: 'success',
        data: newUser,
        };
   }

    @Get('getAllUser')
    @HttpCode(HttpStatus.OK)
    async getAllUser() {
        return await this.userService.findAll()
    }

}
