const { createClient } = require("redis");

const client = async () => {
    // * RedisLabs
    const connection = createClient({
        password: process.env.REDIS_PASSWORD,
        socket: {
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT,
        },
    });

    // * Local Redis
    // const connection = createClient({
    //     socket: {
    //         host: process.env.LOCAL_REDIS_HOST,
    //         port: process.env.LOCAL_REDIS_PORT,
    //     },
    // });

    await connection.connect();

    return connection;
};

module.exports = client;
