'use strict'; 

const Sequelize = require('sequalize');

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
}); 

module.exports = {
    Comment
}