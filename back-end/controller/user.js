const user = require("../models/user.js");
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
require("dotenv").config();

const userControllter = {
    createUser :  async (req,res)=>{

        const email = req.body.email;
        const password = req.body.password;
        const first_name = req.body.first_name;
        const last_name= req.body.last_name;
        const gender = req.body.gender;
        const age = req.body.age;

        const users = await findUser(email);

        if(users) return res.json("User Already exist! Please login !")

    
        const newUser = new user({
            email,
            password,
            first_name,
            last_name,
            gender,
            age
        });
    
        newUser.save().then(()=>{
            res.json("User successfully added")
        }).catch((err)=>{
            console.log("Error : ",err);
            res.json("User added failed");
    
        });
    },
    userLogin: async (req,res)=>{
        const email = req.body.email;
        const password = req.body.password;

       const user = await findUser(email);

       console.log("user===>",user)

       if( !user || user.password !== password) return res.json("invalid Email or password !")
        const accessToken = jwt.sign(user.email,process.env.ACCESS_TOKEN_SECRETS);
        
        res.json({accessToken,user})

    }
}

const findUser = (email) =>{

    console.log("email====>>>",email)
   const usr = user.findOne({ email })
   if(usr) return usr
   else return null;

}

module.exports = userControllter