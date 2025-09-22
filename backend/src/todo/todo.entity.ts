// src/user/user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('todo')
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  text: string;

  @Column({ default: false })
  isImportant: boolean;

  @Column({ default: false })
  isComplete: boolean;
}
