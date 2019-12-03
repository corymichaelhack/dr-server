'use strict';
module.exports = (sequelize, DataTypes) => {
  const buyerFeedback = sequelize.define('buyerFeedback', {
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comment: {
    type: DataTypes.TEXT
    },
    artistId:{
      type: DataTypes.INTEGER,
      allowNull:false
    }
  }, {});
  buyerFeedback.associate = function(models) {
    // associations can be defined here
  };
  return buyerFeedback;
};