import { DataSource } from 'typeorm';
import { Task } from './entity/Task';
import { bootstrap } from './main';

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

// {
//   "name": "test",
//   "imgUrl": "",
//   "status": "TODO",
//   "details": "Testing API",
//   "dueDate": "2025-05-15T00:00:00Z",
//   "repeat": "NEVER"
// }

AppDataSource.initialize()
  .then(async () => {
    bootstrap();
  })
  .catch((error) => console.log(error));
