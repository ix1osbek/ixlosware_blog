import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import adminRoutes from "./routes/adminRoutes.js";
import publicRoutes from "./routes/publicRoutes.js";
import { requestLogger } from "./middleware/requestLogger.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
import logger from "./config/logger.js";
import { connectDB } from "./config/dataSource.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(requestLogger);

app.use("/api", publicRoutes);
app.use("/api/admin", adminRoutes);

app.use(notFound);
app.use(errorHandler);

connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    logger.info(`🚀 Server ${process.env.PORT} portida ishlayapti`);
  });
});
