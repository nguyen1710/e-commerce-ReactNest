import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpCode,
  Get,
  UsePipes,
  ValidationPipe,
  Res,
} from '@nestjs/common';
import { CreateUserDTO } from '../auth/dto/create-user.dto';
import { UserService } from './user.service';
import { User } from './user.entity';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('getAllUser')
  @HttpCode(HttpStatus.OK)
  async getAllUser(@Res() response) {
    const allUser = await this.userService.findAll();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return response.status(HttpStatus.OK).json({
      message: 'Get All user successfully',
      user: allUser,
    });
  }
}
