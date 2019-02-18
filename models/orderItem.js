'use strict';

module.exports = (sequalize, DataTypes) => {
    var OrderItem = sequalize.define('OrderItem', {
        order_id:DataTypes.INTEGER,
        product_id:DataTypes.INTEGER,
        qty:DataTypes.INTEGER,
        price:DataTypes.FLOAT,
        sub_total:DataTypes.FLOAT,
        status:DataTypes.INTEGER
    },
    {
        tableName : 'order_items',
        timestamps: true,
    });

    OrderItem.associate = function(models){
        models.OrderItem.belongsTo(models.Product,{
            onDelete: "CASCADE",
            foreignKey:"product_id",
        });
    }

    return OrderItem;
};