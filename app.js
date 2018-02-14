const bodyParser = require('body-parser'); 
const express = require('express'); 
const morgan = require('morgan'); 
const { Quiz } = require('./models'); 
const { Question } = require('./models'); 
const { router: questionRouter } = require('./routers/question-router'); 
const { router: quizRouter } = require('./routers/quiz-router'); 
const { router: sessionRouter } = require('./routers/session-router'); 
const app = express(); 

app.use(morgan('common')); 

app.use(bodyParser.json()); 

app.use('/questions', questionRouter); 
app.use('/quiz', quizRouter); 
app.use('/session', sessionRouter); 

app.use('*', (req, res) => {
    res.status(404).json({message: 'Not Found'}); 
}); 

module.exports = app; 