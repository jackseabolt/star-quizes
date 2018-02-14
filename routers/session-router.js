'use strict'

const express = require('express'); 
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();  
const { Session } = require('../models');
const router = express.Router(); 


router.delete('/:id', (req, res) => {
    return Session
        .destroy({ where: { id: req.params.id }})
        .then(() => res.sendStatus(204))
        .catch(err => res.status(404).json({
            code: 404, 
            message: 'Invalid session ID', 
            reason: 'Validation Error', 
            location: ':id'
        })); 
}); 

module.exports = {
    router
}