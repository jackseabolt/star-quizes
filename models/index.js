'use strict'; 

const { Article } = require('./article');
const { Comment } = require('./comment');  


const db = {
    Article, 
    Comment
}; 

Object.keys(db).forEach(function(modelName) {
    if (db[modelName].associate) {
        db[modelName].associate(db); 
    }
}); 

module.exports = db; 