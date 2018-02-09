'use strict'; 

const { Article } = require('./article'); 


const db = {
    Article
}; 

Object.keys(db).forEach(function(modelName) {
    if (db[modelName].associate) {
        db[modelName].associate(db); 
    }
}); 

module.exports = db; 