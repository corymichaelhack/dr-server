var express = require('express');
var router = express.Router();
var sequelize = require('../db');
var sellerResponse = require('../models/sellerResponse')
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const validateSession = require('../middleware/validate-session');






module.exports = router;