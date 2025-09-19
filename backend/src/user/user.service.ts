import { Injectable, ConflictException , NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.userRepository.findOne({ where: { email } });
        if(!user) {
            throw new NotFoundException('Email not found')
        }
        console.log(user)
        return user
    }

    async create(user: CreateUserDTO): Promise<User> {
        try {
            const {email, password} = user

            const existingUser = await this.userRepository.findOne({ where: { email } });
            if (existingUser) {
                throw new ConflictException('Email already exists');
            }
            // const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, 10)
            const newUser = {...user, password: hashedPassword}
            return await this.userRepository.save(newUser);
        } catch (error) {
            // ví dụ: email bị trùng
            throw new Error('Cannot create user: ' + error.message);
        }
    }

}
