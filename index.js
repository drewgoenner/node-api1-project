// implement your API here
const express = require('express');

const userDb = require('./data/db.js');

const server = express();

server.use(express.json());

server.post('/api/users', (req, res) => {

    const userData = req.body;

    if(!userData.name || !userData.bio) {
        res.status(400).json({errorMessage: "Please provide name and bio for user"});
    } else {
        userDb
        .insert(userData)
        .then(user => {
            res.status(201).json(user);
        })
        .catch(err => {
            res.status(500).json({error: "There was an error while saving the user to the database"})
        })
    }
    
})

server.get('/api/users', (req, res) => {
    userDb.find()
    .then(users => {
        res.json(users);
    })
    .catch(err => {
        res.status(500).json({error: "The users information could not be retrieved"})
    })
})

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id
        
    userDb.findById(id)
    .then(user => {
        if(user) {
            res.json(user)
        } else{
            res.status(404).json({ message: "The user with the specified ID does not exist"})
        }
    })
    .catch(err => {
        res.status(500).json({ error: "The user information could not be retrieved"})
    })
})

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
   
    userDb.remove(id)
    .then(user => {
        if(user) {
            res.json({message: "User has been removed from the database"})
        } else{
            res.status(404).json({message: "The user with the specified ID does not exist"})
        }
    })
    .catch(err => {
        res.status(500).json({ error: "The user could not be removed"})
    })
})

server.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const updatedUser = req.body
    if(!updatedUser.name || !updatedUser.bio) {
        res.status(400).json({errorMessage: "Please provide name and bio for user"});
    } else {
    userDb.update(id, updatedUser)
        .then(user => {
            if(user) {
                userDb.findById(id)
                    .then(upUser => {
                        res.json(upUser)
                    })
            } else {
                res.status(404).json({ message: "The user with the specified ID does not exist"})
            }
        })
        .then(err => {
            res.status(500).json({ error: "The user information could not be modified"})
        })
    }

})

const port = 8000
server.listen(port, () => console.log(`\n** API on port ${port} **\n`))