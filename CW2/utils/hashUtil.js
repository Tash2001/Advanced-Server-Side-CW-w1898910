const bcrypt =require('bcrypt');

const hashPassword = (plainText) => bcrypt.hashSync(plainText,10);
const comparePassword = (plainText, hash) => bcrypt.compareSync(plainText,hash);

module.exports ={hashPassword,comparePassword};