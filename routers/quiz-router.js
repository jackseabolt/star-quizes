'use strict'
const express = require('express'); 
const bodyParser = require('body-parser'); 
const { Question, Quiz } = require('../models');
const router = express.Router(); 

router.get('/', (req, res) => Quiz.findAll(
    {
      limit: 50, 
      include: [{
          model: Question, 
          as: 'questions'
      }]
    })
    .then(quizes => res.json({
      quizes
    }))
    .catch(err => {
        console.error(err); 
        res.sendStatus(500); 
    })
);

router.get('/:title', (req, res) => {
    return Quiz  
        .find({where: { title: req.params.title}, 
            include: [{
                model: Question, 
                as: 'questions'
            }]
        })
        .then(quiz => res.status(200).json({ quiz }))
        .catch(err => {
            console.error(err); 
            res.sendStatus(500); 
        })
});

router.get('/:title/question/:id/question', (req, res) => {
    return Quiz  
    .find({where: { title: req.params.title}, 
        include: [{
            model: Question, 
            as: 'questions'
        }]
    })
    .then(quiz => {
        let answers = []; 

        quiz.questions[0].answer_one ? answers.push(quiz.questions[0].answer_one): null;
        quiz.questions[0].answer_two ? answers.push(quiz.questions[0].answer_two): null;
        quiz.questions[0].answer_three ? answers.push(quiz.questions[0].answer_three): null;
        quiz.questions[0].answer_four ? answers.push(quiz.questions[0].answer_four): null;

        res.status(200).json({ question: quiz.questions[0].question, answers }); 
    })
    .catch(err => {
        console.error(err); 
        res.sendStatus(500); 
    });
}); 

router.get('/:title/question/:id/answer', (req, res) => {
    return Quiz  
    .find({where: { title: req.params.title}, 
        include: [{
            model: Question, 
            as: 'questions'
        }]
    })
    .then(quiz => {
        let correct_answer = quiz.questions[0].correct_answer; 
        let answers = []; 
        quiz.questions[0].answer_one ? answers.push(quiz.questions[0].answer_one): null;
        quiz.questions[0].answer_two ? answers.push(quiz.questions[0].answer_two): null;
        quiz.questions[0].answer_three ? answers.push(quiz.questions[0].answer_three): null;
        quiz.questions[0].answer_four ? answers.push(quiz.questions[0].answer_four): null;

        res.status(200).json({ question: quiz.questions[0].question, answers, correct_answer }); 
    })
    .catch(err => {
        console.error(err); 
        res.sendStatus(500); 
    }); 
});

router.put('/:title', (req, res) => {
    return Quiz
        .update({ title: req.body.title }, { where: { title: req.params.title }})
        .then(quiz => {
            res.sendStatus(201); 
        })
        .catch(err => {
            console.error(err); 
            res.sendStatus(500); 
        });
}); 

router.post('/', (req, res) => {
    return Quiz
        .create({ 
            title: req.body.title
        })
        .then(quiz => {
            res.status(201).json({title: quiz.title, id: quiz.id })
        })
        .catch(err => {
            console.error(err); 
            res.sendStatus(500); 
        }); 
}); 

router.delete('/:title', (req, res) => {
    return Quiz
        .destroy({
            where: {
                title: req.params.title
            }
        })
        .then(() => {
            res.sendStatus(204);
        })
        .catch(err => {
            console.error(err); 
            res.sendStatus(500); 
        }); 
});

module.exports = { router }