var express = require('express');
var router = express.Router();
var multer = require('multer');
var sequelize = require('../db');
var Skill = sequelize.import('../models/skill');
const validateSession = require('../middleware/validate-session');


// //**Below code only works locally */
// var storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, '../server/images')
//     },
//     filename: (req, file, cb) => {
//       cb(null, file.fieldname + '-' + Date.now())
//     }
// });
// var upload = multer({
//     storage: storage, 
//     fileFilter: (req, file, cb) => {
//     if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/gif") {
//         cb(null, true);
//     } else {
//         cb(null, false);
//         return cb(new Error('Allowed only .png, .jpg, .jpeg and .gif'));
//     }
// }});

//testing that this is updating.
//*Creates skill profile*/
// router.post('/create', upload.single("image"), validateSession, (req, res) => {
    router.post('/create', validateSession, (req, res) => {
        // const url = req.protocol + '://' + req.get("host");
        let title= req.body.title;
        let description= req.body.description;
        // let image= url + "/images/" + req.file.filename '[l;'
        let image = req.body.image;
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
router.get('/getall', function (req, res) {
   
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

//*GET ALL SKILLS PROFILES for ONE ARTIST
router.get('/getall/:id', function (req, res) {
   
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

//*ADMIN DELETE A SKILL PROFILE*/
router.delete('/admindelete/:id', validateSession, function (req, res) {
    Skill.destroy ({
        where: {id: req.params.id}
    }).then(artist => res.status(200).json(artist))
    .catch(err => res.json(req.errors))   
})

//*DELETES SPECIFIC SKILL FOR ONE ARTIST*/
router.delete('/delete/:id', validateSession, function (req, res) {
    let skill = req.params.id;
    let artistId = req.artist.id;

    Skill
    .destroy ({
        where: {id: skill, artistId: artistId}
    }).then(
        function deleteSkillSuccess() {
            res.send(`you removed skillId:${skill} from artistId${artistId}`)
        },
        function deleteSkillError(err){
            res.send(500, err.message)
        }
    )
})

//**UPDATE SKILL FOR SPECIFIC ARTIST */
router.put('/updateskill/:id', validateSession, (req, res) => {    
    Skill.update(req.body, { where: { id: req.params.id }})           
      .then(skill => res.status(200).json(skill))
      .catch(err => res.json(req.errors))
  })

module.exports = router;

