import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import * as process from 'process';
import * as dotenv from 'dotenv';

dotenv.config();
const {
  POSTGRES_PORT,
  POSTGRES_HOST,
  POSTGRES_USERNAME,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
} = process.env;
const HOST = POSTGRES_HOST || 'localhost';

const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: HOST,
  port: +POSTGRES_PORT,
  username: POSTGRES_USERNAME,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
};
export default config;
