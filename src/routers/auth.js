const express = require('express');
const bcrypt = require("bcrypt");
const validator = require("validator"); 
const cookiesParser = require("cookie-parser");
const jwt = require("jsonwebtoken")
const authRouter = express.Router();
const {validateSignUpData} =  require("../utils/validation");
const User = require('../models/user');


authRouter.post("/login" , async(req, res) =>{

  const {password, email } = req.body;
  try{
    if(!validator.isEmail(email)){
      throw new Error("email is not valid please enter correct email id")
    }
    const user = await User.findOne({email})
    if(!user){
      throw new Error(" user Not found");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if(isPasswordValid){
      const token =  jwt.sign({_id : user._id} , "hellothisiskey", {expiresIn: "1d"})
      res.cookie("token", token , {expires : new Date(Date.now() + 8*360000) });
      console.log("token",token)
      res.send("user login");
    }else{
      throw  new Error("user password is not correct")
    }
  }catch(err) {
     res.status(400).send("somthing wrong "+ err.message);
  }
})

authRouter.post("/signup", async (req, res) => {
  const {firstName, lastName, email, password, age, gender } = req.body;
  try {
    validateSignUpData(req)
    const passwordHash = await bcrypt.hash(password , 10);
    console.log(passwordHash)
    const user = new User({firstName , lastName, email, password: passwordHash , gender, age});
    const userData = await user.save();
    res.send("userDate addded", userData);
  } catch (err) {
    res.status(400).send("somthing wrong "+ err.message);
  }
});


authRouter.post("/logout", async(req, res) =>{
  res.cookie("token" , null , {expires : new Date(Date.now())})
  res.send("User logout")
});

module.exports = authRouter;