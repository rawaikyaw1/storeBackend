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

    User.associate = function (models){
        models.User.hasMany(models.Order, {
            onDelete: "CASCADE",
            foreignKey : "customer_id",
        });
    };
    
    return User;
};