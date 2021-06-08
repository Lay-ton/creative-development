const redisConfig =   {
    host:"localhost",
    port:6379,
    password:"mystrongpassword",
    sessionKeyPrefix:"SESSION:",
    sessionExpire:172800
}

export default redisConfig;