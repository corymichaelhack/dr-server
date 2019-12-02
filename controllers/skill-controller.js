var express = require('express');
var router = express.Router();
var sequelize = require('../db');
var Artist = sequelize.import('../models/artist');
var Skill = sequelize.import('../models/skill');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const validateSession = require('../middleware/validate-session');


//*Creates skill profile*/
router.post('/createskill', validateSession, (req, res) => {
        let title= req.body.title;
        let description= req.body.description;
        let image= req.body.image;
        let price= req.body.price;
        let skillType= req.body.skillType;
        let artistId= req.artist.id;
    

    Skill.create({
        title: title,
        description: description,
        image: image,
        price: price,
        skillType: skillType,
        artistId: artistId
    }).then(skill => res.status(200).json(skill))
        .catch(err => console.log(err));
});

//*GET ALL SKILL PROFILES 
router.get('/getallskills', function (req, res) {
   
    Skill.findAll()                           //in future, change to ONLY bring back "artists"
    .then( 
        function findAllSuccess(data) {
        res.json(data)
    },
    function findAllError(err){
        res.send(500, err.message)
    }
)
})

//*GET ALL SKILL PROFILES for ONE ARTIST
router.get('/getallskills/:id', function (req, res) {
   
    Skill.findAll({
            where: { 
                artistId: req.params.id  
            },
    })                           
    .then( 
        function findAllSuccess(data) {
        res.json(data)
    },
    function findAllError(err){
        res.send(500, err.message)
    }
)
})

//*GET ONE SKILL PROFILE
router.get('/:id', function (req, res) {
    Skill.findOne({
        where: { 
            artistId: req.params.id
            
        },
        include: 'artist'
    })
    .then(artist => res.status(200).json(artist))   //
    .catch(err => res.status(500).json({error:err}))
})

//*DELETE SKILL PROFILE FOR SINGLE ARTIST*/

       

module.exports = router;


