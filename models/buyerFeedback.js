'use strict';
module.exports = (sequelize, DataTypes) => {
  const buyerFeedback = sequelize.define('buyerFeedback', {
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        max: 5,
        min: 1
      }
    },
    comment: {
    type: DataTypes.TEXT
    },
    skillId:{
      type: DataTypes.INTEGER,
      allowNull:false
    }
  }, {});
  buyerFeedback.associate = function(models) {
    // associations can be defined here
  };
  return buyerFeedback;
};