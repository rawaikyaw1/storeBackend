'use strict';

module.exports = (sequalize, DataTypes) => {
    var Customer = sequalize.define('Customer', {
        name:DataTypes.STRING,
        phone:DataTypes.STRING,
        email:DataTypes.STRING,
        address:DataTypes.TEXT,
        township_id:DataTypes.INTEGER,
        status:DataTypes.INTEGER
    },
    {
        tableName : 'customers',
        timestamps: true,
    });

    Customer.associate = function (models){
        models.Customer.belongsTo(models.Township, {
            onDelete: "CASCADE",
            foreignKey : "township_id",
        });
    };

    return Customer;
};