'use strict'; 

const { Quiz } = require('./quiz');  
const { Question } = require('./question');  
const { Session } = require('./session'); 

const db = {
    Quiz, 
    Question, 
    Session
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