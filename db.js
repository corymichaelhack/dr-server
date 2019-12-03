const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres'
});

sequelize.authenticate().then(
    function(){
        console.log('Connected to DR server postgres database');
    },
    function(err){
        console.log(err);
    }
);


Artist = sequelize.import('./models/artist');
Skill = sequelize.import('./models/skill');
BuyerFeedback= sequelize.import('./models/buyerFeedback');
SellerResponse= sequelize.import('./models/sellerResponse');

Skill.belongsTo(Artist);
Artist.hasMany(Skill);

BuyerFeedback.belongsTo(Artist);
Artist.hasMany(BuyerFeedback);

SellerResponse.belongsTo(Artist);
Artist.hasMany(SellerResponse);


module.exports = sequelize;