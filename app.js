const bodyParser = require('body-parser'); 
const express = require('express'); 
const morgan = require('morgan'); 
const { Quiz } = require('./models'); 
const { Question } = require('./models'); 

const app = express(); 

app.use(morgan('common')); 
app.use(bodyParser.json()); 

app.get('/quiz', (req, res) => Quiz.findAll(
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

app.get('/quiz/:title', (req, res) => {
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

app.get('/quiz/:title/question/:id/question', (req, res) => {
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

app.get('/quiz/:title/question/:id/answer', (req, res) => {
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

app.put('/quiz/:title', (req, res) => {
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

app.post('/quiz', (req, res) => {
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

app.delete('/quiz/:title', (req, res) => {
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


app.get('/questions', (req, res) => {
    return Question
        .findAll()
        .then(questions => res.status(200).json(questions))
        .catch(err => {
            console.error(err); 
            res.sendStatus(500); 
        }); 
}); 

app.put('/questions/:id', (req, res) => {
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

app.post('/questions', (req, res) => {
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
})

app.use('*', (req, res) => {
    res.status(404).json({message: 'Not Found'}); 
}); 

module.exports = app; 