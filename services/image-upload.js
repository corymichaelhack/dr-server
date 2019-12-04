// const aws = require('aws-sdk')
// const multer = require('multer')
// const multerS3 = require('multer-s3')
// const sequelize = require('../db');
 
// // const config = require('../config')

// aws.update({
//     secretAccessKey: process.env.SECRET_ACCESS_KEY,
//     accessKeyId: process.env.ACCESS_KEY_ID,
//     region:'us-east-2'
// })

// const s3 = new aws.S3({})



// const upload = multer({
//     storage: multerS3({
//       s3: s3,
//       bucket: 'drartistimage',
//       acl: 'public-read',
//       metadata: function (req, file, cb) {
//         cb(null, {fieldName: 'TESTING_META_DATA'});
//       },
//       key: function (req, file, cb) {
//         cb(null, Date.now().toString())
//       }
//     })
//   })

//   module.exports = upload;