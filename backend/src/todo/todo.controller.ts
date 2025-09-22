import {
  Controller,
  Post,
  UseGuards,
  Body,
  Req,
  HttpException,
  HttpStatus,
  Get,
  Param,
  Patch,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @UseGuards(JwtAuthGuard)
  @Post('add')
  async addTodo(@Body() body: { text: string }, @Req() req) {
    const userId = req.user.userId;
    const todo = await this.todoService.addTodo(body.text, userId);

    if (!todo) {
      throw new HttpException('Cannot create todo', HttpStatus.BAD_REQUEST);
    }
    return {
      message: 'Todo created successfully',
      todo,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('getAllTodo')
  async getAllTodo(@Req() req) {
    const userId = req.user.userId;
    const todos = await this.todoService.getAllTodo(userId);
    console.log('controller: ', todos);
    return {
      success: true,
      todos: todos,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/update/:id')
  async updateTodo(
    @Param('id') id: number,
    @Body()
    body: { text?: string; isComplete?: boolean; isImportant?: boolean },
  ) {
    const updatedTodo = await this.todoService.updateTodo(id, body);
    return {
      message: 'Todo updated successfully',
      todo: updatedTodo,
    };
  }
}
