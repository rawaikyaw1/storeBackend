'use strict';

module.exports = (sequalize, DataTypes) => {
    var OrderItem = sequalize.define('OrderItem', {
        order_id:DataTypes.INTEGER,
        product_id:DataTypes.INTEGER,
        qty:DataTypes.INTEGER,
        price:DataTypes.FLOAT,
        subtotal:DataTypes.FLOAT,
        status:DataTypes.INTEGER
    },
    {
        tableName : 'order_items',
        timestamps: true,
    });

    return OrderItem;
};