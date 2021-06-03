export default (connection, Sequelize) => {
    const User = connection.define('users', {
        username: {
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
        },
        password: {
            type: Sequelize.STRING,
        }
    }, {
        tableName: 'users',
    });

    return User
};