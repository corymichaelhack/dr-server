const jwt = require('jsonwebtoken');
const Artist = require('../db').import('../models/artist');

module.exports = function (req, res, next) {
    if(req.method =='OPTIONS') {
        next()
    } else {
        let sessionToken = req.headers.authorization;
        console.log(sessionToken)  //delete this later
        if (!sessionToken) return res.status(403).send({auth: false, message: 'No token provided'});
        else {
            jwt.verify(sessionToken, 'something', (err, decoded) => {
                if(decoded) {
                    Artist.findOne({where: { id: decoded.id}}).then(artist => {
                        req.artist = artist;
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