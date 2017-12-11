const Redis = require('ioredis');

const redis = new Redis({
  port: process.env.REDIS_PORT,          // Redis port
  host: process.env.REDIS_HOST,   // Redis host
  password: process.env.REDIS_PWD,
  family: 4,           // 4 (IPv4) or 6 (IPv6)
  db: 0
  //ttl: 1000 * 60 * 60 * 24
});

module.exports = redis;