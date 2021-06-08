import redis from '../../configs/redis.config.js'
import { v4 as uuid } from 'uuid';

class SessionStorage {
    constructor(client) {
        this._redisClient = client;
        this._redis = null;
        this._SESSION_PREFIX = redis.sessionKeyPrefix;
        this._SESSION_EXPIRE = redis.sessionExpire;
    }

    async init() {
        this._redis = this._redisClient.init()
            .then(() => {
                console.log("Initialized redis successfully")
            })
            .catch((err) => {
                throw new Error('There was a problem initializing redis connection: ' + err)
            });
    }

    /**
     * Create User Session
     * @param user
     * @returns {Promise<string>}
     */
    async createSession(user){
        const sessionId = uuid.v4();
        this._redis.set(this._SESSION_PREFIX + sessionId, JSON.stringify({uid: user.uid}), 'EX', this._SESSION_EXPIRE)
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