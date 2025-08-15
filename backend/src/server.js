import "reflect-metadata";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import { AppDataSource } from "./config/dataSource.js";
import adminRoutes from "./routes/adminRoutes.js";
import publicRoutes from "./routes/publicRoutes.js";
import { requestLogger } from "./middleware/requestLogger.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
import logger from "./config/logger.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

// Har bir so‘rovni Telegramga log qilish
app.use(requestLogger);

// Public API
app.use("/api", publicRoutes);

// Admin API
app.use("/api/admin", adminRoutes);

// 404 handler
app.use(notFound);

// Xatolik handler
app.use(errorHandler);

AppDataSource.initialize()
  .then(() => {
    logger.info("✅ PostgreSQL ulandi");
    app.listen(process.env.PORT, () => {
      logger.info(`🚀 Server ${process.env.PORT} portida ishlayapti`);
    });
  })
  .catch((err) => {
    logger.error("❌ DB ulanish xatosi: " + err.message);
    process.exit(1);
  });
