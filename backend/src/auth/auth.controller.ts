import { Controller, Post, HttpCode, HttpStatus, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service'
import { LoginDTO } from './dto/login.dto';
@Controller('auth')
export class AuthController {
    constructor (
        private readonly authService : AuthService
    ){}

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    async login(@Body() body: LoginDTO) {
         try{
            const newUser = await this.authService.login(body);
            return {
                success: true,
                message: 'Login successfully',
                user: newUser
            }
        }catch(error){
            return {
                success: false,
                error: error.message
            }
        }
    }
}
