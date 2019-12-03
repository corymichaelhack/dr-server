var express = require('express');
var router = express.Router();
var sequelize = require('../db');
var buyerFeedback= require('../models/buyerFeedback')

const validateSession = require('../middleware/validate-session');

router.post('/create', validateSession, (req, res) => {
    const feedbackFromRequest ={
        rating: req.body.rating,
        comment: req.body.comment,
        artistId: req.artist.id
    }
    BuyerFeedback.create(feedbackFromRequest)
    .then(buyerfeedback => res.status(200).json(buyerfeedback))
    .catch(err => console.log(err));
});




module.exports = router;