'use strict';
module.exports = (sequelize, DataTypes) => {
  const artist = sequelize.define('artist', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    role: {
      type: DataTypes.ENUM,
      values: ['artist', 'admin', 'disabled']
    },
    // Forg
    // skill_id: {
    //     types: DataTypes.INTEGER,
    //     allowNull: false,   
    // } 
  }, {});
  artist.associate = function(models) {
    // associations can be defined here
  };
  return artist;
};