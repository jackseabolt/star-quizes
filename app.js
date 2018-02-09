const bodyParser = require('body-parser'); 
const express = require('express'); 
const morgan = require('morgan'); 
const { Article } = require('./models'); 

const app = express(); 

app.use(morgan('common')); 
app.use(bodyParser.json()); 

app.get('/', (req, res) => Article.findAll({
    attributes: ['title', 'genre', 'id']
    },
    {
      limit: 50
    })
    .then(articles => res.json({
      articles
    }))
);

app.get('/:id', (req, res) => {
    return Article  
        .findById(req.params.id)
        .then(article => res.status(200).json({ article }))
}); 

app.post('/', (req, res) => {
   return Article
    .create({
        title: req.body.title, 
        genre: req.body.genre
    })
    .then(article => res.status(201).json({ article }))
    .catch(err => res.status(500).send({ message: err.message})); 
}); 

app.put('/:id', (req, res) => {
    const toUpdate = {}; 
    const updateableFields = ['title', 'genre']; 

    updateableFields.forEach(field => {
        if(field in req.body) {
            toUpdate[field] = req.body[field]; 
        }
    }); 

    return Article
        .update(toUpdate, {
            where: {
                id: req.params.id
            }
        })
        .then(() => res.sendStatus(204))
        .catch(err => {
            res.status(500).json({ message: err.mesage })
        })
}); 


app.delete('/:id', (req, res) => {
    return Article
        .destroy({
            where: {
                id: req.params.id
            }
        })
        .then(() => {
            res.sendStatus(204);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
}); 

app.use('*', (req, res) => {
    res.status(404).json({message: 'Not Found'}); 
}); 

module.exports = app; 