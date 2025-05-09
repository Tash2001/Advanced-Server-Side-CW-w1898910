const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET  || 'fallbackSecret';

const generatetoken = (payload) => jwt.sign(payload,secret, {expiresIn:'1h'});

module.exports= {generatetoken};