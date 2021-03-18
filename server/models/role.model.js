export default (connection, Sequelize) => {
    const Role = connection.define('roles', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
        }
    }, {
        tableName: 'roles',
    });

    return Role
}