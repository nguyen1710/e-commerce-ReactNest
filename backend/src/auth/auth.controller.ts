import {
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Body,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { CreateUserDTO } from './dto/create-user.dto';
import { LocalAuthGuard } from 'src/guard/local.guard';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED) // 201 Created
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async create(@Body() user: CreateUserDTO) {
    try {
      const newUser = await this.authService.register(user);
      return {
        success: true,
        user: newUser,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async login(@Body() body: LoginDTO) {
    try {
      const newUser = await this.authService.login(body);
      return {
        success: true,
        message: 'Login successfully',
        user: newUser,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
