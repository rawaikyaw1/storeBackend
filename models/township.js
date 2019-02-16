'use strict';

module.exports = (sequalize, DataTypes) => {
    var Township = sequalize.define('Township', {
        name:DataTypes.STRING,
        status:DataTypes.INTEGER
    },
    {
        tableName : 'townships',
        timestamps: true,
    });

    Township.associate = function (models){
        models.Township.hasMany(models.Customer, {
            onDelete: "CASCADE",
            foreignKey : "township_id",
        });
    };

    return Township;
};