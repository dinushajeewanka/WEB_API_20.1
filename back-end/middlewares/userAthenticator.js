const { json } = require('express/lib/response');
const jwt = require('jsonwebtoken')
const dotenv = require("dotenv");
require("dotenv").config();

const verifyUser = (req, res, next) => {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    console.log("authHeader", req.headers)

    if(!token) return res.json("cannot find token");

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRETS,(err , user)=>{
        if(err) return res.json("Invalid Token");

        req.user = user;

        next();

    })

}

module.exports = verifyUser