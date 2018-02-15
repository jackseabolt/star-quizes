'use strict'

const express = require('express'); 
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();  
const { Question, Quiz, Session } = require('../models');
const router = express.Router(); 


// START QUIZ OR ANSWER QUESTION

router.get('/:quizTitle/question/:sessionId', (req, res) => {
    let quizId, current, sessionId, quizLength, score; 
    return Quiz
        .find({
            where: { title: req.params.quizTitle }
        })
        .then(quiz => {
            quizId = quiz.id
            if (req.params.sessionId === 'new') {
                // no sessionId was provided
                console.log("THIS RAN")
                return Session
                    .create({ score: 0, current: 0, quiz_id: quizId }) 
                    .then(session => {
                        sessionId = session.id;
                        current = session.current 
                        return
                    })
                    .then(() => {
                          return Quiz  
                            .find({where: { title: req.params.quizTitle}, 
                                include: [{
                                    model: Question, 
                                    as: 'questions'
                                }]
                            })
                            .then(quiz => {
                                quizLength = quiz.questions.length; 
                                let answers = []; 
                                let question = null; 

                                if(quizLength) {
                                    quiz.questions[current].answer_one ? answers.push(quiz.questions[current].answer_one): null;
                                    quiz.questions[current].answer_two ? answers.push(quiz.questions[current].answer_two): null;
                                    quiz.questions[current].answer_three ? answers.push(quiz.questions[current].answer_three): null;
                                    quiz.questions[current].answer_four ? answers.push(quiz.questions[current].answer_four): null;
                                    question = quiz.questions[current].question
                                }
                                else {
                                    return Session
                                        .destroy({where: { id: sessionId }})
                                        .then(() => {
                                            res.status(500).json({ 
                                               code: 500, 
                                               message: 'Quiz has no questions', 
                                               location: 'quizTitle', 
                                               reason: 'Validation Error'
                                            }); 
                                        })
                                        .catch(err => res.sendStatus(500))
                                }

                                return res.status(200).json({ 
                                    question, 
                                    answers, 
                                    sessionId, 
                                    // For display purposes, not logic
                                    current: current + 1 , 
                                    quizLength, 
                                    title: quiz.title 
                                }); 
                            })
                            .catch(err => { 
                                res.sendStatus(500); 
                            });
                    })
                    .catch(err => {
                        console.error(err.message); 
                        res.sendStatus(500);
                    })
            } else {
                // A sessionId was provided
                console.log("WRONG RAN")
                sessionId = req.params.sessionId
                console.log("SESSION ID", sessionId)
                return Session
                .findById(sessionId) 
                .then(session => { 
                    current = session.current;  
                    score = session.score;
                    console.log("HERE IS SESSION") 
                    return
                })
                .then(() => {
                    return Quiz  
                    .find({where: { title: req.params.quizTitle}, 
                        include: [{
                            model: Question, 
                            as: 'questions'
                        }]
                    })
                    .then(quiz => {
                        quizLength = quiz.questions.length; 

                        let answers = []; 
                        quiz.questions[current].answer_one ? answers.push(quiz.questions[current].answer_one): null;
                        quiz.questions[current].answer_two ? answers.push(quiz.questions[current].answer_two): null;
                        quiz.questions[current].answer_three ? answers.push(quiz.questions[current].answer_three): null;
                        quiz.questions[current].answer_four ? answers.push(quiz.questions[current].answer_four): null;

                        res.status(200).json({ 
                            question: quiz.questions[current].question, 
                            answers, 
                            sessionId, 
                            // For display purposes, not logic
                            current: current + 1, 
                            quizLength, 
                            score 
                        }); 
                    })
                })
                .catch(err => {
                    console.error(err); 
                    res.sendStatus(500); 
                }); 
            }
        });    
}); 

// ANSWER A QUIZ QUESTION

router.post('/:quizTitle/answer/:sessionId', jsonParser, (req, res) => {
    let current, sessionId, question, correct_answer, score, response, quizLength;
    let answers = [];
    return Session
    .findById(req.params.sessionId) 
    .then(session => { 
        score = session.score; 
        sessionId = session.id;
        current = session.current 
        return Quiz  
        .find({where: { title: req.params.quizTitle}, 
            include: [{
                model: Question, 
                as: 'questions'
            }]
        })
        .then(quiz => {
            quizLength = quiz.questions.length; 

            quiz.questions[current].answer_one ? answers.push(quiz.questions[current].answer_one): null;
            quiz.questions[current].answer_two ? answers.push(quiz.questions[current].answer_two): null;
            quiz.questions[current].answer_three ? answers.push(quiz.questions[current].answer_three): null;
            quiz.questions[current].answer_four ? answers.push(quiz.questions[current].answer_four): null;
            
            correct_answer = quiz.questions[current].correct_answer; 

            if (correct_answer === req.body.answer) {
                score += 1; 
                response = "You're right!"
            }
            else {
                response = "That is not correct."
            }
            console.log(`Current before ${current}`)
            current += 1; 
            console.log(`Current after ${current}`)
            question = quiz.questions[current - 1].question; 

            if(current >= quizLength) {
                return Session
                .destroy({where: { id: req.params.sessionId}})
                .then(() => {
                    response = `${response} Your final score is ${score/quizLength * 100}%`; 
                    res.status(200).json({ 
                        question, 
                        answers, 
                        correct_answer, 
                        score, 
                        response, 
                        current, 
                        continue: false, 
                        quizLength 
                    }); 
                })
                .catch(err => {
                    res.send(404).json({
                        code: 404, 
                        reason: 'Validation Error', 
                        location: 'Session Id', 
                        message: 'Session was not found'
                    })
                })
            } 
            else {
                return Session
                .update({ score, current }, {where: { id: req.params.sessionId}})
                .then(() => {
                    res.status(200).json({ 
                        question, 
                        answers, 
                        correct_answer, 
                        score, 
                        response, 
                        current,
                        quizLength, 
                        continue: true }); 
                })
                .catch(err => {
                    res.send(404).json({
                        code: 404, 
                        reason: 'Validation Error', 
                        location: 'Session Id', 
                        message: 'Session was not found'
                    });
                });
            }
        })
        .catch(err => { 
            res.send(404).json({
                code: 404, 
                reason: 'Validation Error', 
                location: 'Quiz Title', 
                message: 'Quiz was not found'
            });
        }); 
    }) 
    .catch(err => {
        res.send(404).json({
            code: 404, 
            reason: 'Validation Error', 
            location: 'Session Id', 
            message: 'Session was not found'
        });
    });
});

// GET WITHOUT QUESTIONS

router.get('/', (req, res) => Quiz.findAll(
    {
      limit: 50
    })
    .then(quizes => res.json({
      quizes
    }))
    .catch(err => {
        console.error(err); 
        res.sendStatus(500); 
    })
);


// ADMIN ROUTES

// ADMIN - GET ALL QUIZES

router.get('/adminget', (req, res) => Quiz.findAll(
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

// ADMIN - GET ENTIRE QUIZ

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

// ADMIN - UPDATE A QUIZ

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

// ADMIN - CREATE A QUIZ

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

// ADMIN - DELETE A QUIZ

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