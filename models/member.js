'use strict'; 
const Sequelize = require('sequelize'); 

const {sequelize} = require('../db/sequelize'); 

const Member = sequelize.define('Member', 
    {
        id: {
            type: Sequelize.INTEGER, 
            primaryKey: true, 
            autoIncrement: true
        }, 
        firstName: {
            type: Sequelize.STRING, 
            allowNull: false
        }, 
        lastName: {
            type: Sequelize.STRING, 
            allowNull: false
        }
    }, 
    {
        tableName: 'articles',
        timestamps: false,
        underscored: true
    }
);

Member.associate = function(models) {
    Member.hasMany(
        models.Member, 
        {
            as: 'siblings', 
            foreignKey: { allowNull: false }
        }
    )
}

module.exports = {
    Member
}