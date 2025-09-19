import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDTO } from './dto/create-user.dto';
@Injectable()
export class UserService {
    constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

   async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

    async create(user: CreateUserDTO): Promise<User> {
        try {
            return await this.userRepository.save(user);
        } catch (error) {
            // ví dụ: email bị trùng
            throw new Error('Cannot create user: ' + error.message);
        }
    }



}
