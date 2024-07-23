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
    await client.rPush('myKey', ["0", "1", "2"]);
    const value = await client.lRange("myKey", 0, 2);
    console.log(value);
  } catch (err) {
    console.error("Error executing rPush:", err);
  } finally {
    await client.quit();
  }
};

run().catch(console.error);

