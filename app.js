require('dotenv').config(); //to help hide our token signatures
let express = require('express');
let app = express();

//CONTROLLERS
let artist = require('./controllers/artist-controller');
let skill = require('./controllers/skill-controller');
let feedback = require('./controllers/feedback-controller');

let sequelize = require('./db');
sequelize.sync(); //tip pass in {force:true} for resetting all tables

//APP USE
app.use(express.json())// to use the req.body middleware
app.use(require('./middleware/headers'));

// app.use("/test", function(req, res){
//     res.send("data from server")
// })
// EXPOSED ROUTES
app.use('/', artist); //call artist routes
app.use('/skill', skill)  //so anyone can browse skills

// PROTECTED ROUTES
app.use(require('./middleware/validate-session'));
app.use('/', skill); //call skill routes
// app.use('/', feedback); //call feedback routes






app.listen(3000, () => {
    console.log(`Hello from ${process.env.PORT}.`);
})