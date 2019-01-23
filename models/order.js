'use strict';

module.exports = (sequalize, DataTypes) => {
    var Order = sequalize.define('Order', {
        customer_id:DataTypes.INTEGER,
        total_amount:DataTypes.FLOAT,
        discount:DataTypes.FLOAT,
        payment_method:DataTypes.INTEGER,
        status:DataTypes.INTEGER
    },
    {
        tableName : 'orders',
        timestamps: true,
    });

    return Order;
};