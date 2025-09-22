import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async addTodo(text: string, userId: string) {
    const todo = this.todoRepository.create({
      text,
      user_id: Number(userId), // gán user_id
      // completed, important sẽ tự default = false
    });
    return await this.todoRepository.save(todo);
  }

  async getAllTodo(userId: string) {
    const todo = await this.todoRepository.find({
      where: { user_id: Number(userId) },
    });
    // console.log(todo);
    return todo;
  }

  async updateTodo(id: number, updateData: Partial<Todo>): Promise<Todo> {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) {
      throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
    }

    Object.assign(todo, updateData);
    return await this.todoRepository.save(todo);
  }
}
