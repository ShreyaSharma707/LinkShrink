import "dotenv/config";

import connectDB from "./src/config/mongo.config.js";
import clickWorker from "./src/worker/click.worker.js";
import logger from "./src/config/logger.config.js";
import mongoose from "mongoose";

let shuttingDown = false;

export const startWorker = async () => {
    try {
        await connectDB();

        logger.info("Worker process started");
    } catch (error) {
        logger.error({
            message: "Worker startup failed",
            error: error.message,
            stack: error.stack,
        });
        throw error;
    }
};

const stopWorker = async (signal) => {
    if (shuttingDown) return;
    shuttingDown = true;

    logger.info({ message: "Stopping worker", signal });
    await clickWorker.close();
    await mongoose.disconnect();
};

process.once("SIGINT", () => stopWorker("SIGINT"));
process.once("SIGTERM", () => stopWorker("SIGTERM"));

startWorker().catch(() => {
    process.exitCode = 1;
});