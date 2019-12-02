var express = require('express');
var router = express.Router();
var sequelize = require('../db');
var Artist = sequelize.import('../models/artist');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

//REGISTER ARTIST 
router.post('/register', (req, res) => {
    Artist.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 13),
        role: req.body.role
    }).then(
        createSuccess = (artist) => {
            
            let token = jwt.sign({id: artist.id}, "something", {expiresIn: 60*60*24})
           
            console.log(token);
        res.json({
            artist: artist,
            message: 'artist created',
            // sessionToken: token
        })
    },
    createError = err => res.send(err))
    .catch(err => res.send(500, err))      
    });


//LOGIN ARTIST 
router.post('/login', (req, res) => {
    Artist.findOne({ where: {email: req.body.email} })
    .then(artist => {
        if (artist){
            bcrypt.compare(req.body.password, artist.password, (err, matches) => {
                if (matches){
                    let token = jwt.sign({id: artist.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24})
                    res.json({
                        // artist: artist,
                        // message: 'successfully authenticated artist',
                        sessionToken: token
                    })
                } else {
                    res.status(502).send({ error: "bad gateway, passwords don't match"})
                }
            })
        } else {
            res.status(500).send({ error: 'failed to authenticate, no user found'})
        }
    }, err => res.status(501).send({ error: 'failed to process'})
    )
})

module.exports = router;
