'use strict'; 

const Sequelize = require('sequelize'); 

const {sequelize} = require('../db/sequelize'); 


const Article = sequelize.define('Article', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: Sequelize.STRING, 
        allowNull: false
    },
    genre: Sequelize.ENUM('Fiction', 'Non-Ficotion', 'Biography', 'Fantasy', 'Mystery')
  }, {
    tableName: 'articles',
    timestamps: false,
    underscored: true,
    classMethods: {
        associate: function(models) {
            Article.hasMany(
                models.Comment, 
                {
                    as: 'comments', 
                    foreignKey: { allowNull: false }, 
                    onDelete: 'CASCADE'
                }
            ); 
        }
    }
  }
);

module.exports = {
    Article
}; 