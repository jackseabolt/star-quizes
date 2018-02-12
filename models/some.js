'use strict'; 

const Sequelize = require('sequelize'); 

const {sequelize} = require('../db/sequelize'); 

const Question = sequelize.define('Question', {
    id: {
        type: Sequelize.INTEGER, 
        primaryKey: true, 
        autoIncrement: true
    }, 
    question: {
        type: Sequelize.STRING, 
        allowNull: false
    }, 
    answer_one: {
        type: Sequelize.STRING, 
        allowNull: true
    }, 
    answer_two: {
        type: Sequelize.STRING, 
        allowNull: true
    }, 
    answer_three: {
        type: Sequelize.STRING, 
        allowNull: true
    }, 
    answer_four: {
        type: Sequelize.STRING, 
        allowNull: true
    }, 
    correct_answer: {
        type: Sequelize.STRING, 
        allowNull: false
    }
}, {
        tableName: 'questions', 
        timestamps: false, 
        underscored: true
});  
                    

Question.associate = function(models) {
    Question.belongsTo(
        models.Quiz, 
        {
            as: 'questions', 
            foreignKey: { allowNull: false }, 
            onDelete: 'CASCADE'
        }
    ); 
}

module.exports = {
    Question
}


