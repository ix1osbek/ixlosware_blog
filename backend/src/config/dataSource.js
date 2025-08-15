import mongoose from "mongoose";
import dotenv from "dotenv";
import logger from "./logger.js";

dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info("✅ MongoDB Atlas ulandi");
  } catch (err) {
    logger.error("❌ MongoDB ulanish xatosi: " + err.message);
    process.exit(1);
  }
};
