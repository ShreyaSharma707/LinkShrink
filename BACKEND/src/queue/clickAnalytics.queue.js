import { Queue } from "bullmq";
import bullMQConnection from "../config/bullmq.config.js";

const clickAnalyticsQueue = new Queue("click-analytics", {
    connection: bullMQConnection,
    defaultJobOptions: {
        attempts: 3,
        backoff: {
            type: "exponential",
            delay: 1000,
        },
        removeOnComplete: 1000,
        removeOnFail: 5000,
    },
});

export default clickAnalyticsQueue;