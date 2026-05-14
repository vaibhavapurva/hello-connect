const express = require("express");
const profileRouter = express.Router();
const {userAuth} = require("../middlewares/auth");
const User = require("../models/user");
const {validateProfileDateUpdate, passwordValition} = require("../utils/validation")
const bcrypt = require("bcrypt")

profileRouter.get("/profile/view", userAuth, async(req, res) =>{
 const user = req.user
  try{
    res.send( user)
  }catch(err) {
     res.status(400).send("somthing wrong "+ err.message);
  }

})

profileRouter.patch('/profile/update/:userId' , async(req, res) =>{
  const userId = req.params?.userId
  const data = req.body;
  try{
    
    if(!validateProfileDateUpdate(req)){
      throw new Error("update not allowed")
    }
    if(data?.skills.length >10){
      throw new Error("skills can not added more then 10")
    }
    const user = await User.findByIdAndUpdate({_id  : userId}, data)
    res.send("user data updated")
  }catch(err){
        res.status(400).send("somthing want  worng"+ err.message)
    }
})

profileRouter.patch('/profile/forgetPassword', userAuth , async (req, res) =>{
    const loginUser = req.user;
    const currentPassword = req.body.currentPassword;

    const isOldPassword = await bcrypt.compare(currentPassword , loginUser.password)
    if(!isOldPassword){
        throw new Error("your current password is not vaild")
    }
    try{
        passwordValition(req);
        const user = req.user
        console.log("duusuusus")
        const passwordHash = await bcrypt.hash(req.body.newPassword , 10);
        console.log("dhhjkdhdjkhjk")
        user.password =  passwordHash;
        await user.save()
        res.send("your password is updated")
    }catch(err){
        res.status(400).send("somthing want  worng"+ err.message)
    }
})

module.exports = profileRouter;