import { Controller, Post, Body , HttpStatus, HttpCode, Get, UsePipes, ValidationPipe, Res} from '@nestjs/common';
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
        try{
            const newUser = await this.userService.create(user);
            return {
                success: true,
                user: user
            }
        }catch(error){
            return {
                success: false,
                error: error.message
            }
        }
   }


    @Get('getAllUser')
    @HttpCode(HttpStatus.OK)
    async getAllUser(@Res() response) {
        let allUser =  await this.userService.findAll()
        return response.status(HttpStatus.OK).json({
            message: 'Get All user successfully',
            user: allUser
        })
    }

}
