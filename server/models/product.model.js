export default (connection, Sequelize) => {
    const Product = connection.define('product', {
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
        },
        typeTable: {
            type: Sequelize.STRING,
        }
    },{
        tableName: 'products',
    });

    return Product
}