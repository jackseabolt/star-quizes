'use strict'; 

const Sequelize = require('sequelize');

const {sequelize} = require('../db/sequelize'); 

const Comment = sequelize.define('Comment', {
    id: { 
        type: Sequelize.INTEGER, 
        primaryKey: true, 
        autoIncrement: true
    }, 
    content: {
        type: Sequelize.STRING, 
        allowNull: false
    }
}, {
    tableName: 'comments', 
    timestamps: false, 
    underscored: false,
    classMethods: {
        associate: function(models) {
            Comment.belongsTo(
                models.Article, 
                { foreignKey: { allowNull: false }, onDelete: 'CASCADE'}
            ); 
        }
    } 
}); 

module.exports = {
    Comment
}