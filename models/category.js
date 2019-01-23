'use strict';

module.exports = (sequalize, DataTypes) => {
    var Category = sequalize.define('Category', {
        name:DataTypes.STRING,
        parent_id:DataTypes.INTEGER,
        status:DataTypes.INTEGER
    },
    {
        tableName : 'categories',
        timestamps: true,
    });

    Category.associate = function (models){
        models.Category.hasMany(models.Product, {
            onDelete: "CASCADE",
            foreignKey : "category_id",
        });
    };

    return Category;
};