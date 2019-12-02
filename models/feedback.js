'use strict';
module.exports = (sequelize, DataTypes) => {
  const feedback = sequelize.define('feedback', {
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comments: {
    type: DataTypes.TEXT
    }
  }, {});
  feedback.associate = function(models) {
    // associations can be defined here
  };
  return feedback;
};