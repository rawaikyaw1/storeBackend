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
    
    Order.associate = function(models){
        models.Order.belongsTo(models.User,{
            onDelete: "CASCADE",
            foreignKey:"customer_id",
        });
    }

    return Order;
};