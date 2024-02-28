const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const config = require('../config/config')

// ------------------------ Generate ash password by using bcryptjs --------------------------------------

const hashPassword = async (password) =>{
    let hashedPassword = await bcrypt.hash(password,12);
    return hashedPassword;
}

// ------------------------ Generate ash password by using bcryptjs --------------------------------------

const validatePassword = async (password,hashedPassword) =>{
    let isPasswordValid = await bcrypt.compare(password,hashedPassword);
    return isPasswordValid
}


// ------------------------ Generate JWT Token --------------------------------------

const createToken = async  (tokenObject) => {
    let jwtToken = jwt.sign({data:{...tokenObject}},config.auth.secret,{expiresIn:24 * 60 * 60});
    return jwtToken;
}

// ------------------------ Module Exports --------------------------------------

module.exports={
    hashPassword,
    validatePassword,
    createToken
}