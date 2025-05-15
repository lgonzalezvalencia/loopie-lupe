import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Task } from './entity/Task';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 6432,
  username: 'user',
  password: 'password',
  database: 'postgres',
  synchronize: true,
  logging: false,
  entities: [Task],
  migrations: [],
  subscribers: [],
});
