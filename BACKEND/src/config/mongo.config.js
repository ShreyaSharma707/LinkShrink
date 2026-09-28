import mongoose from "mongoose";
import config from "./app.config.js";
import logger from "./logger.config.js";

const connectDB = async () => {
  if (!config.MONGO_URL) {
    throw new Error("MONGO_URL is not configured");
  }

  try {
    const conn = await mongoose.connect(config.MONGO_URL);
    logger.info(`MongoDB connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    logger.error({
      message: "MongoDB connection failed",
      error: error.message,
      stack: error.stack,
    });
    throw error;
  }
};

export default connectDB;