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
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs"; 
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(requestLogger);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const swaggerDocument = YAML.load(path.join(__dirname, "swagger.yaml"));

// Swagger UI uchun endpoint
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api", publicRoutes);
app.use("/api/admin", adminRoutes);

app.use(notFound);
app.use(errorHandler);

connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        logger.info(`🚀 Server ${process.env.PORT} portida ishlayapti`);
    });
});
