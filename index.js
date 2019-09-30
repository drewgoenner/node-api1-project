// implement your API here
const express = require('express');

const db = require('./data/db.js');

const server = express();

server.use(express.json());

server.post('/api/users', (req, res) => {

    const userData = req.body;

    if(!userData.name || !userData.bio) {
        res.status(400).json({errorMessage: "Please provide name and bio for user"});
    } else {
        db
        .insert(userData)
        .then(user => {
            res.status(201).json(user);
        })
        .catch(err => {
            res.status(500).json({error: "There was an error while saving the user to the database"})
        })
    }
    
})

const port = 8000
server.listen(port, () => console.log(`\n** API on port ${port} **\n`))