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
    else {
        console.log("NOT ASSOCIATED", modelName)
    }
}); 

module.exports = db; 