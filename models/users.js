'use strict';

module.exports = (sequalize, DataTypes) => {
    var User = sequalize.define('User', {
        name:DataTypes.STRING,
        phone:DataTypes.STRING,
        email:DataTypes.STRING,
        password:DataTypes.STRING,
        address:DataTypes.TEXT,
        status:DataTypes.INTEGER
    },
    {
        tableName : 'users',
        timestamps: true,
    });
    
    return User;
};