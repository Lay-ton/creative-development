export default (connection, Sequelize) => {
    const Photo = connection.define('photo', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        productId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'products',
                key: 'id'
            }
        },
        sizes: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        prices: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        images: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    },{
        timestamps: false,
        tableName: 'photos',
    });

    // Photo.associate = (models) => {
    //     Photo.belongsTo(models.product, {foreignKey: 'productId', as: 'product'})
    // }

    return Photo
}

export default (connection) => {
    const MongoPhotos = connection.createCollection('photo', 
        {
            autoIndexId: true,
            
        }
    )
}