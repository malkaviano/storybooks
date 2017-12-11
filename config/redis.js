const Redis = require('ioredis');

const redis = new Redis({
  port: process.env.REDIS_PORT,          // Redis port
  host: process.env.REDIS_HOST,   // Redis host
  password: process.env.REDIS_PWD,
  family: 4,           // 4 (IPv4) or 6 (IPv6)
  db: 0  
});

redis.set('my test key', 'my test value');
redis.get('my test key', function(error, result) {
  if (error) throw error;
  console.log('GET result ->', result)
});

module.exports = redis;