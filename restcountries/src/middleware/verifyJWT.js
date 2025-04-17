const jwt = require('jsonwebtoken');
require('dotenv').config();
const db = require('../config/database');
const UsageDao = require('../dao/usageDao.js');
const UserDao = require('../dao/userDao');
const usageDao = new UsageDao(db);

function verifyJWT(req, res, next){
    const authHeader = req.headers['authorization'];
    if(!authHeader) return res.status(401).json({message:'missing token'});

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET || 'default_secret', (err, decode)=>{

        if(err) return res.status(403).json({message:'invalid token'});

        req.user =decode;

        usageDao.logUsage(decode.id,req.originalUrl,(err)=>{
            if(err) console.error('Failed to log usage:',err.message);
        });
        next();
    });
}

module.exports = verifyJWT;