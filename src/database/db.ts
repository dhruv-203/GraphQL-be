import "reflect-metadata";
import { DataSource } from "typeorm";
import { Todos } from "./Todos.js";
const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: true, // only in developement
  logging: ["error"],
  migrations: [],
  subscribers: [],
  // entities: ["../app/entities/*.ts"],
  entities: [Todos],
});

export { AppDataSource };
