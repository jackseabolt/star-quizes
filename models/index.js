'use strict'; 

const { Member } = require('./member');  

const db = {
    Member
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