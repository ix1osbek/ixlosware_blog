import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import Admin from "../entities/Admin.js";
import {Post} from "../entities/Post.js";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: String(process.env.DB_PASSWORD),
    database: process.env.DB_NAME,
    synchronize: true, // dev uchun
    logging: false,
    entities: [Post, Admin],
});
