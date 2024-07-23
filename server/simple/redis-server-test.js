/**
 * 기본 값: 6379포트, 127.0.0.1
 * 변경시 redis.conf 파일에서 변경 가능
 */

const redis = require("redis");
const client = redis.createClient({
  url: 'redis://127.0.0.1:6379'
});

client.on('error', (err) => {
  console.error('Redis Client Error', err);
});

client.on('ready', () => {
  console.log('Redis client connected');
});

const run = async () => {
    await client.connect();

    try {
        const value = await client.get("myKey");
        console.log(value);
    } catch (err) {
        console.error("Error getting value:", err);
    } finally {
        await client.quit();
    }
};

run().catch(console.error);