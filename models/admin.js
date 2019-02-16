'use strict';

module.exports = (sequalize, DataTypes) => {
    var Admin = sequalize.define('Admin', {
        name:DataTypes.STRING,
        email:DataTypes.INTEGER,
        password:DataTypes.INTEGER
    },
    {
        tableName : 'admin',
        timestamps: true,
    });


    return Admin;
};