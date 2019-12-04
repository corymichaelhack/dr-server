var express = require('express');
var router = express.Router();
var sequelize = require('../db');
var Artist = sequelize.import('../models/artist');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const validateSession = require('../middleware/validate-session');

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
            sessionToken: token
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
                        artist: artist,
                        message: 'successfully authenticated artist',
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

//*GET ALL ARTISTS*/
router.get('/getartists', function (req, res) {
   
    Artist.findAll()                             //in future, change to ONLY bring back "artists"
    .then(artist => res.status(200).json(artist))   //
    .catch(err => res.status(500).json({error:err}))
})

//*GET ONE ARTIST**/
router.get('/:id', function (req, res) {
    let data = req.params.id;
    Artist.findOne({where: { id: data}})
    .then(artist => res.status(200).json(artist))   //
    .catch(err => res.status(500).json({error:err}))
})

//*DELETE A SPECIFIC ARTISTS
router.delete('/delete/:id', validateSession, (req, res)=> {                            
    Artist.destroy({where: {id: req.params.id}})                   
    .then(artist => res.status(200).json(artist))
    .catch(err => res.json(req.errors))                 
})

//** ADMIN UPDATE A SPECIFIC ARTIST */
router.put('/adminupdate/:id', validateSession, (req, res) => {  
    let id = req.params.id
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let password = req.body.password;
    let role = req.body.role;

    Artist.update({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: bcrypt.hashSync(password, 13),
        role: role
    },
         {where: { id: id }})
      .then(artist => res.status(200).json(artist))
      .catch(err => res.json(req.errors))
  })

//**UPDATE A SPECIFIC ARTIST BY SESSION TOKEN *///This lets anyone update currently, even if it is not your sessionToken
router.put('/update/:id', validateSession, function (req, res) {
    let vsArtistId = req.artist.id;
    let artistId = req.params.id;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let password = req.body.password;
    let role = req.body.role;
    
    if (vsArtistId != artistId){
        res.send("This is not a valid update")
    } else {

        Artist
    .update (
        {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: bcrypt.hashSync(password, 13),
            role: role
        },
        {
        where: { id: req.params.id }
    }).then(
        function updateArtistSuccess() {
            res.send(`you updated`)
        },
        function updateArtistError(err){
            res.send(500, err.message)
        }
    )
    }
})
module.exports = router;
