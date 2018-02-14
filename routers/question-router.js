'use strict'
const express = require('express'); 
const bodyParser = require('body-parser'); 
const { Question } = require('../models');
const router = express.Router(); 


// ADMIN - GET ALL QUESTIONS

router.get('/', (req, res) => {
    return Question
        .findAll()
        .then(questions => res.status(200).json(questions))
        .catch(err => {
            console.error(err); 
            res.sendStatus(500); 
        }); 
}); 

// ADMIN - GET A QUESTION 

router.get('/:questionId', (req, res) => {
    console.log(`re.params.id ${req.params.questionId}`)
    return Question
        .findById(req.params.questionId)
        .then(question => {
            if(!question) {
                throw error; 
            }
            res.status(200).json(question)
        })
        .catch(err => {
            res.status(404).json({
                code: 404, 
                reason: 'Validation Error', 
                location: 'Question Id', 
                message: 'Invalid question ID' 
            }); 
        });  
}); 

// ADMIN - UPDATE A QUESTION

router.put('/:id', (req, res) => {
    const toUpdate = {}; 
    const updateableFields = ['question', 'answer_one', 'answer_two', 'answer_three', 'answer_four', 'correct_answer' ]; 
    updateableFields.forEach(field => {
        if(field in req.body) {
            toUpdate[field] = req.body[field]; 
        }
    }); 
    return Question
        .update(toUpdate, { 
            where: { title: req.params.id }
        })
}); 

// ADMIN - POST A QUESTION

router.post('/', (req, res) => {
    // check for required fields 
    const reqFields = ['question', 'correct_answer']; 
    Object.keys(req.body).forEach(field => {
        if (!field in reqFields) {
            res.status(422).json({ 
                code: 422,
                reason: 'Validation Error', 
                location: field, 
                message: `${field} is required`
            })
        }
    })
    const toCreate = {}; 
    const optionalFields = ['question', 'answer_one', 'answer_two', 'answer_three', 'answer_four', 'correct_answer', 'quiz_id' ]; 
    optionalFields.forEach(field => {
        if(field in req.body) {
            toCreate[field] = req.body[field]; 
        }
    });
    return Question
        .create(toCreate)
        .then(question => {
            res.status(201).json({ question })
        })
        .catch(err => {
            console.error(err); 
            res.sendStatus(500); 
        }); 
}); 

// ADMIN - DELETE A QUESTION

router.delete('/:id', (req, res) => {
    return Question
        .destroy({ where: { id: req.params.id }})
        .then(() => res.sendStatus(204))
        .catch(err => {
            console.error(err); 
            res.sendStatus(500); 
        })
}); 


module.exports = { router }; 
