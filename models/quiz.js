'use strict'; 

const Sequelize = require('sequelize'); 

const {sequelize} = require('../db/sequelize'); 

const Quiz = sequelize.define('Quiz', 
    {
        id: {
            type: Sequelize.INTEGER, 
            primaryKey: true, 
            autoIncrement: true
        }, 
        title: {
            type: Sequelize.STRING, 
            allowNull: false
        }, 
        image: {
            type: Sequelize.STRING, 
            allowNull: false
        }
    }, 
    {
        tableName: 'quizes',
        timestamps: false,
        underscored: true
    }
);

Quiz.associate = function(models) {
    Quiz.hasMany(
        models.Question, 
        {
            as: 'questions', 
            foreignKey: { allowNull: false }, 
            onDelete: 'CASCADE'
        }
    )
    Quiz.hasMany(
        models.Session, 
        {
            as: 'sessions', 
            foreignKey: { allowNull: false }, 
            onDelete: 'CASCADE'
        }
    )
}

module.exports = {
    Quiz
}