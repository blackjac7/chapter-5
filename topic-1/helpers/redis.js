const redis = require("../config/redis");

exports.getFromCache = async (key) => {
    const redisClient = await redis();
    try {
        const cacheData = await redisClient.get(key);
        return cacheData ? JSON.parse(cacheData) : null;
    } finally {
        await redisClient.quit();
    }
};

exports.saveToCache = async (key, data, expiration) => {
    const redisClient = await redis();
    try {
        const payload = JSON.stringify(data);
        await redisClient.set(key, payload, { EX: expiration });
    } finally {
        await redisClient.quit();
    }
};

exports.removeFromCache = async (key) => {
    const redisClient = await redis();
    try {
        await redisClient.del(key);
    } finally {
        await redisClient.quit();
    }
};
