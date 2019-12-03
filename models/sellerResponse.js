'use strict';
module.exports = (sequelize, DataTypes) => {
  const sellerResponse = sequelize.define('sellerResponse', {
    comment: {
    type: DataTypes.TEXT
    },
    buyerFeedbackId:{
      type: DataTypes.INTEGER,
      allowNull:false
    }
  }, {});
  sellerResponse.associate = function(models) {
    // associations can be defined here
  };
  return sellerResponse;
};