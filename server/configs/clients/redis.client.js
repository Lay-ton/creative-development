import Redis from 'ioredis';
import redisConfig from '../redis.config.js'

class RedisClient {
    constructor() {
        this._HOST = redisConfig.host;
        this._PORT = redisConfig.port;
        this._PASS = redisConfig.password;
    }

    async init() {
        try {
            return new Redis({
                host: this._HOST,
                port: this._PORT,
                password: this._PASS,
            });
        }catch (err) {
            throw new Error('Problem with redis connection: ' + err);
        }
    }
}

export default RedisClient;