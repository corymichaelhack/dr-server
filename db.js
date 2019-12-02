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

Skill.belongsTo(Artist);
Artist.hasMany(Skill);



module.exports = sequelize;