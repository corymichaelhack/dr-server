// const aws = require('aws-sdk')
// const multer = require('multer')
// const multerS3 = require('multer-s3')
// const sequelize = require('../db');
 
// const config = require('../config/config')

// aws.config.update({
//   secretAccessKey: config.AWS_SECRET_ACCESS,
//   accessKeyId: config.AWS_ACCESS_KEY,
//   region: 'us-east-1'
// })

// const s3 = new aws.S3();

// const upload = multer({
//     storage: multerS3({
//       s3: s3,
//       bucket: 'drartistpicture',
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