const { createUser, findUserByEmail } = require("../daos/userDao");
const { hashPassword, comparePassword } = require("../utils/hashUtil");
const { generatetoken } = require("../utils/jwtUtil");


const register = (req, res)=>{
    const {username, email, password} =req.body;
    const hashedPassword = hashPassword(password);

    createUser(username, email, hashedPassword, (err,UserId)=>{
        if(err) return res.status(500).json({error: err.message});
        res.status(201).json({msg:'User registered successfully', UserId});
        
    });
};

const login = (req,res)=> {
    const{email,password} = req.body;

    findUserByEmail(email, (err, user)=>{
        if (err||!user)return res.status(401).json({error:'Invalid username'});

        const isMatch = comparePassword(password, user.password);
        if(!isMatch) return res.status(401).json({error:'Invalid password'});

        const token = generatetoken({id:user.id, username:user.username});
        res.json({msg:'Login Successful',token});
    });

};

module.exports= {register, login};