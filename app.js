require('dotenv').config(); //to help hide our token signatures
let express = require('express');
let app = express();
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cors = require('cors');
//CONTROLLERS
let artist = require('./controllers/artist-controller');
let skill = require('./controllers/skill-controller');
let feedback = require('./controllers/feedback-controller');
let config = require('./config');

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
app.use('/skill', skill)  //so anyone can browse skills

// PROTECTED ROUTES
app.use(require('./middleware/validate-session'));
// app.use('/skill', skill); //call skill routes

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
  
  
app.listen(process.env.PORT, () => {
    console.log(`Hello from ${process.env.PORT}.`);
})