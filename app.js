require('dotenv').config(); //to help hide our token signatures
let express = require('express');
let app = express();

const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cors = require('cors');
//CONTROLLERS
let artist = require('./controllers/artist-controller');
let artistCreds = require('./controllers/artist-creds-controller');
let skill = require('./controllers/skill-controller');
let config = require('./config');
let aws= require('aws-sdk');

let buyerFeedback = require('./controllers/buyerFeedback-controller');
let sellerResponse = require('./controllers/sellerResponse-controller');
let imageUpload = require('./routes/image-upload')
let sequelize = require('./db');
sequelize.sync(); //tip pass in {force:true} for resetting all tables

//APP USE
app.use(express.json())// to use the req.body middleware

app.use(require('./middleware/headers'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(cors());


// app.use("/test", function(req, res){
//     res.send("data from server")
// })
// EXPOSED ROUTES
app.use('/artist', artist); //call artist routes
app.use('/auth', artistCreds); //log artist credentials
app.use('/skill', skill)  //so anyone can browse skills

// PROTECTED ROUTES
app.use(require('./middleware/validate-session'));

// app.use('/images', imageUpload)
app.use('/artist', artist);
app.use('/skill', skill); //call skill routes


// app.use('/', feedback); //call feedback routes

if (process.env.NODE_ENV !== 'dev') {
    app.use('/', express.static(path.join(__dirname, './dist')));
  }
  
require('./api')(app, config);

if (process.env.NODE_ENV !== 'dev') {
    app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, '/dist/index.html'));
    });
  }
  

app.use('/feedback', buyerFeedback); //call feedback routes
app.use('/response', sellerResponse); //call response routes



app.listen(process.env.PORT, () => {
    console.log(`Hello from ${process.env.PORT}.`);
})
