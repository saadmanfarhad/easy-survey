const mongoose = require('mongoose');
const keys = require('../config/keys');
const redis = require('redis');

let redisClient;

// write a function to connect to redis
const connectRedis = async () => {
  const redisUrl = keys.redisUrl;
  const redisPassword = keys.redisPassword;
  redisClient = redis.createClient({
    password: redisPassword,
    socket: {
      host: redisUrl,
      port: 18148,
    },
  });

  redisClient.on('error', (err) => console.log('Redis Client Error', err));
  redisClient.on('connect', () => console.log('Redis Client Connected'));

  await redisClient.connect();
};

connectRedis();

const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = async function (options = {}) {
  this.useCache = true;
  this.hashKey = JSON.stringify(options.key || '');

  return this;
};

mongoose.Query.prototype.exec = async function () {
  if (!this.useCache) {
    return exec.apply(this, arguments);
  }
  const key = JSON.stringify({
    ...this.getQuery(),
    collection: this.mongooseCollection.name,
  });

  const cacheValue = await redisClient.hGet(this.hashKey, key);

  if (cacheValue) {
    const doc = JSON.parse(cacheValue);

    return Array.isArray(doc)
      ? doc.map((d) => new this.model(d))
      : new this.model(doc);
  }

  const result = await exec.apply(this, arguments);
  await redisClient.hSet(this.hashKey, key, JSON.stringify(result), 'EX', 10);
  return result;
};

module.exports = {
  async clearHash(hashKey) {
    console.log('clearing hash', JSON.stringify(hashKey));
    await redisClient.del(JSON.stringify(hashKey));
  },
};
