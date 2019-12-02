'use strict';
module.exports = (sequelize, DataTypes) => {
  const skill = sequelize.define('skill', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
    type: DataTypes.TEXT
    },
    image: {
        type: DataTypes.TEXT
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    }, 
    skillType: {
      type: DataTypes.STRING
    },

  }, {});
  skill.associate = function(models) {
    // associations can be defined here
  };
  return skill;
};