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

    return Customer;
};