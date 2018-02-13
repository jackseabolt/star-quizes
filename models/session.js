'use strict'; 

const Sequelize = require('sequelize'); 

const {sequelize} = require('../db/sequelize'); 


const Session = sequelize.define('Session', {
    id: {
        type: Sequelize.INTEGER, 
        primaryKey: true, 
        autoIncrement: true
    }, 
    score: {
        type: Sequelize.INTEGER, 
        defaultValue: 0, 
        allowNull: false
    }, 
    current: {
        type: Sequelize.INTEGER, 
        defaultValue: 0, 
        allowNull: false
    }
}, {
    tableName: 'sessions', 
    timestamps: false, 
    underscored: true
}); 

Session.associate = function(models) {
    Session.belongsTo(
        models.Quiz, 
        {
            as: 'quiz', 
            foreignKey: { allowNull: false }, 
            onDelete: 'CASCADE'
        }
    )
}

module.exports = {
    Session
}; 
