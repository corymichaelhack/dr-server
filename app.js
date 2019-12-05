require('dotenv').config(); //to help hide our token signatures
let express = require('express');
let app = express();
let aws= require('aws-sdk');



//CONTROLLERS
let artist = require('./controllers/artist-controller');
let skill = require('./controllers/skill-controller');
let buyerFeedback = require('./controllers/buyerFeedback-controller');
let sellerResponse = require('./controllers/sellerResponse-controller');
let imageUpload = require('./routes/image-upload')

let sequelize = require('./db');
sequelize.sync(); //tip pass in {force:true} for resetting all tables

//APP USE
app.use(express.json())// to use the req.body middleware

app.use(require('./middleware/headers'));


// app.use("/test", function(req, res){
//     res.send("data from server")
// })
// EXPOSED ROUTES
app.use('/artist', artist); //call artist routes
app.use('/skill', skill)  //so anyone can browse skills

// PROTECTED ROUTES
app.use(require('./middleware/validate-session'));
// app.use('/images', imageUpload)
app.use('/artist', artist);
app.use('/skill', skill); //call skill routes
app.use('/feedback', buyerFeedback); //call feedback routes
app.use('/response', sellerResponse); //call response routes





app.listen(process.env.PORT, () => {
    console.log(`Hello from ${process.env.PORT}.`);
})