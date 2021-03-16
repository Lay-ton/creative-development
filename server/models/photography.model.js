export default (connection, Sequelize) => {
    const Photography = connection.define('photography', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        image: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        published: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        }
    },{
        tableName: 'photography',
    });

    return Photography
}