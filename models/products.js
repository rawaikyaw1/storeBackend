'use strict';

module.exports = (sequalize, DataTypes) => {
    var Product = sequalize.define('Product', {
        title:DataTypes.STRING,
        category_id:DataTypes.INTEGER,
        thumbnail:DataTypes.STRING,
        description:DataTypes.TEXT,
        price:DataTypes.FLOAT,
        status:DataTypes.INTEGER
    },
    {
        tableName : 'products',
        timestamps: true,
    });

    Product.associate = function (models){
        models.Product.belongsTo(models.Category, {
            onDelete: "CASCADE",
            foreignKey : "category_id",
        });
    };

    Product.associate = function (models){
        models.Product.hasMany(models.OrderItem, {
            onDelete: "CASCADE",
            foreignKey : "product_id",
        });
    };

    return Product;
};