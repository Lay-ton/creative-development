import redis from '../../configs/redis.config.js'
import { v4 as uuidv4 } from 'uuid';

class SessionStorage {
    constructor(client) {
        this._redisClient = client;
        this._redis = null;
        this._SESSION_PREFIX = redis.sessionKeyPrefix;
        this._SESSION_EXPIRE = redis.sessionExpire;
    }

    async init() {
        this._redis = await this._redisClient.init()
    }

    /**
     * Create User Session
     * @param user
     * @returns {Promise<string>}
     */
    async createSession(user){
        const sessionId = uuidv4();
        console.log("SESSION ID: " + sessionId)
        await this._redis.set(this._SESSION_PREFIX + sessionId, JSON.stringify({uid: user.username}), 'EX', this._SESSION_EXPIRE)
            .then(() => {
                console.log('SESSION KEY WAS SET')
            })
            .catch((err) => {
                throw new Error('Problem setting key in redis: ' + err)
            })

        return sessionId;
    }

    /**
     * Return current session
     * @param sid
     * @returns {Promise<string>}
     */
    async getSession(sid) {
        const payload = await this._redis.get(this._SESSION_PREFIX + sid);

        if (payload) {
            return JSON.stringify(payload);
        }else {
            throw new Error('Session does not exist');
        }
    }

}
export default SessionStorage;