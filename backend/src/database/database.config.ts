import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv'

dotenv.config()
export const databaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME,
  autoLoadEntities: true,
  synchronize: true, // chỉ bật khi dev
};