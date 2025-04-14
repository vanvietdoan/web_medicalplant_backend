import { DataSource } from "typeorm";
import config from "../utils/config"; 

export const AppDataSource = new DataSource({
  type: "mysql",
  host: config.database.host,
  port: config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.name,
  synchronize: false,
  logging: true,
  entities: [
    "src/entities/**/*.ts",
  ],

});