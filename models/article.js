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
    instanceMethods: {
      apiRepr: function() {
        return {
            title: this.title, 
            genre: this.genre, 
            id: this.id
        }
      }
    }
  }
);

module.exports = {
    Article
}; 