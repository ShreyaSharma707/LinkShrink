import { Worker } from "bullmq";
import bullMQConnection from "../config/bullmq.config.js";
import { processClick } from "../services/click.service.js";
import logger from "../config/logger.config.js";

const clickWorker = new Worker(
    "click-analytics",
    async (job) => {
        const shortUrl = job.data?.shortUrl;
        if (typeof shortUrl !== "string" || shortUrl.length === 0) {
            throw new TypeError(`Invalid click job payload for job ${job.id}`);
        }

        await processClick(shortUrl);
        logger.info({ message: "Click count updated", shortUrl, jobId: job.id });
    },
    {
        connection: bullMQConnection,
        concurrency: 10,
        removeOnComplete: { count: 1000 },
        removeOnFail: { count: 5000 },
    }
);

clickWorker.on("ready", () => {
    logger.info("Click Worker is ready");
});

clickWorker.on("completed", (job) => {
    logger.info({ message: "Click job completed", jobId: job.id });
});

clickWorker.on("failed", (job, err) => {
    logger.error({
        message: "Click job failed",
        jobId: job?.id,
        error: err.message,
        stack: err.stack,
    });
});

export default clickWorker;