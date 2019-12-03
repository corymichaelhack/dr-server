var express = require('express');
var router = express.Router();
var sequelize = require('../db');
var buyerFeedback= require('../models/buyerFeedback')
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const validateSession = require('../middleware/validate-session');






module.exports = router;