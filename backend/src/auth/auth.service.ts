/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginDTO } from './dto/login.dto';
import bcrypt from 'node_modules/bcryptjs';
import { CreateUserDTO } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(user: CreateUserDTO): Promise<{ access_token: string }> {
    const { email, password } = user;

    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.userRepository.create({
      ...user,
      password: hashedPassword,
      created_at: new Date(),
      updated_at: new Date(),
    });
    const savedUser = await this.userRepository.save(newUser);

    // tạo jwt token sau khi đăng ký
    const payload = { sub: savedUser.id, email: savedUser.email };
    const token = await this.jwtService.signAsync(payload);

    return { access_token: token };
  }

  async login(user: LoginDTO) {
    const { email, password } = user;
    try {
      const user = await this.userService.findByEmail(email);
      if (!user) {
        throw new UnauthorizedException('Email not found');
      }
      const isMatch = await bcrypt.compare(password, user.password);
      // console.log(isMatch + hashedPassword + "," + user.password)
      if (!isMatch) {
        throw new UnauthorizedException('Password invalid');
      }

      const payload = { sub: user.id, email: user.email };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      throw new Error('Lỗi đăng nhập: ' + error.message);
    }
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      // bỏ password khi return
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
