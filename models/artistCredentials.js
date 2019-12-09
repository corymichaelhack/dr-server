// 'use strict';
module.exports = (sequelize, DataTypes) => {
  const artistCreds = sequelize.define('artistCreds', {
    
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }, 
    // role: {
    //   type: DataTypes.ENUM,
    //   values: ['user', 'admin']
    // },
    // Forg
    // skill_id: {
    //     types: DataTypes.INTEGER,
    //     allowNull: false,   
    // } 
  }, {});
  artistCreds.associate = function(models) {
    // associations can be defined here
  };
  return artistCreds;
};