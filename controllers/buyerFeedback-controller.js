var express = require('express');
var router = express.Router();
var sequelize = require('../db');
const BuyerFeedback = sequelize.import('../models/buyerFeedback')
const validateSession = require('../middleware/validate-session');

//*Creates buyer feedback*/
router.post('/create', validateSession, (req, res) => {
    const feedbackFromRequest ={
        rating: req.body.rating,
        comment: req.body.comment,
        artistId: req.artist.id
    }
    console.log(feedbackFromRequest)
    BuyerFeedback.create(feedbackFromRequest)
    .then(buyerfeedback => res.status(200).json(buyerfeedback))
    .catch(err => console.log(err));
});

//*GET ALL FEEDBACK for ONE BUYER 
router.get('/getall/:id', function (req, res) {
   
   BuyerFeedback.findAll({
            where: { 
                artistId: req.params.id  
            },
            include: 'artist'
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

//*ADMIN DELETE A FEEDBACK BUNDLE*/
router.delete('/admindelete/:id', validateSession, function (req, res) {
    BuyerFeedback.destroy ({
        where: {id: req.params.id}
    }).then(feedback => res.status(200).json(feedback))
    .catch(err => res.json(req.errors))   
})

//*DELETES SPECIFIC FEEDBACK BUNDLE FOR ONE ARTIST*/
router.delete('/delete/:id', validateSession, function (req, res) {
    let feedback = req.params.id;
    let artistId = req.artist.id;

    BuyerFeedback
    .destroy ({
        where: {id: feedback, artistId: artistId}
    }).then(
        function deleteFeedbackSuccess() {
            res.send(`you removed feedbackId:${feedback} from artistId${artistId}`)
        },
        function deleteFeedbackError(err){
            res.send(500, err.message)
        }
    )
})

//**ADMIN UPDATE BUYER FEEDBACK FOR SPECIFIC ARTIST */
// router.put('/updatefeedback/:id', validateSession, (req, res) => {    
//     BuyerFeedback.update(req.body, { where: { id: req.params.id }})          
//       .then(feedback => res.status(200).json(feedback))
//       .catch(err => res.json(req.errors))
//   })

//*UPDATE SPECIFIC SKILL FOR ONE ARTIST*///DOES WORK, although it always give success message even when it doesn't work.Work on why.
router.put('/update/:id', validateSession, function (req, res) {
    let feedback = req.params.id;
    let artistId = req.artist.id;
    // console.log(feedback)
    BuyerFeedback
    .update (req.body, {
        where: {id: feedback, artistId: artistId}
    }).then(
        function updateFeedbackSuccess() {
            res.send(`you updated artistId:${feedback} from artistId${artistId}`)
        },
        function updateFeedbackError(err){
            res.send(500, err.message)
        }
    )
})

module.exports = router;