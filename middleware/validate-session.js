const jwt = require('jsonwebtoken');
const Artist = require('../db').import('../models/artist');

// const validateSession = (req, res, next) => {
//     if (req.method == 'OPTIONS'){
//         next();
//     } else {
//         const token = req.headers.authorization;
//         jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//             if (!err && decoded){
//                 Artist.findOne(
//                     { where: {id: decoded.id} },
//                     console.log(decoded)
//                 )
//                 .then(artist => {
//                     if(!artist) throw 'err'
//                     req.artist = artist
//                     console.log(req.artist)
//                     return next();
//                 })
//                 .catch(err => next(err))
//             } else {
//                 req.errors = err
//                 return res.status(500).send('Not authorized')
//             }
//         })
//     }
// }

// module.exports = validateSession;


module.exports = function (req, res, next) {
    if(req.method =='OPTIONS') {
        next()
    } else {
        let sessionToken = req.headers.authorization;
        console.log(sessionToken)  //delete this later
        if (!sessionToken) return res.status(403).send({auth: false, message: 'No token provided'});
        else {
            jwt.verify(sessionToken, process.env.JWT_SECRET, (err, decoded) => {
                if(decoded) {
                    Artist.findOne({where: { id: decoded.id}}).then(user => {
                        req.user = user;
                        next();
                    },
                    function() {
                        res.status(401).send({error: 'Not authorized, no matching user found'})
                    })
                } else {
                    res.status(400).send({error: 'No value for decoded password'})
                }
            })
        }}
}