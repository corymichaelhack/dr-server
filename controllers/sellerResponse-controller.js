var express = require('express');
var router = express.Router();
var sequelize = require('../db');
const SellerResponse = sequelize.import('../models/sellerResponse');
const BuyerFeedback = sequelize.import('../models/buyerFeedback')
const validateSession = require('../middleware/validate-session');


//*Creates seller response*/
// router.post('/create/:id', validateSession, (req, res) => {
//     BuyerFeedback.findOne({ where: {id: req.params.id}})
//     .then(buyerFeedback => {console.log(buyerFeedback)
//         SellerResponse.create({
//         comment: req.body.comment,
//         buyerFeedbackId: buyerFeedback.id}
//     )})
//     .then(sellerResponse => res.status(200).json({message: 'seller response created'}))
//     .catch(err => console.log(err));
// });

router.post('/create/', validateSession, (req, res) => {
        SellerResponse.create({
        comment: req.body.comment,
        buyerFeedbackId: req.buyerFeedback.id})
    
    .then(sellerResponse => res.status(200).json({sellerResponse}, console.log(buyerFeedbackId)))
    .catch(err => console.log(err))
});



//*GET Responses from one seller 
// router.get('/get/:id/:id', validateSession, function (req, res){
//     BuyerFeedback.findOne({ where: {id: req.params.id}})
//     // .then(buyerFeedback =>)
//         SellerResponse.findOne( {where: {buyerFeedbackid: req.buyerFeedback.id} }
//             )
        
//         .then(function createSuccess(data){
//             res.status(200).json({
//                 message: "Seller Response Found",
//                 data:data
//             })
//         }).catch(err => res.status(500).json("Seller Response not found", err))
//     })

    




module.exports = router;