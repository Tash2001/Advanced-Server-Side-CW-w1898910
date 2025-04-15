const jwt = require('jsonwebtoken');
require('dotenv').config();

function verifyJWT(req, res, next){
    const authHeader = req.headers['authorization'];
    if(!authHeader) return res.status(401).json({message:'missing token'});

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET || 'default_secret', (err, decode)=>{

        if(err) return res.status(403).json({message:'invalid token'});

        req.user =decode;
        next();
    });
}

module.exports = verifyJWT;