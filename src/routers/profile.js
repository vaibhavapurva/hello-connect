const express = require("express");
const profileRouter = express.Router();
const {userAuth} = require("../middlewares/auth");
const User = require("../models/user");
profileRouter.get("/profile", userAuth, async(req, res) =>{
 const user = req.user
  try{
    res.send( user)
  }catch(err) {
     res.status(400).send("somthing wrong "+ err.message);
  }

})

profileRouter.patch('/user/:userId' , async(req, res) =>{
  const userId = req.params?.userId
  const data = req.body;
  try{
    const  ALLOWED_UPDATES = ["userId",'userImage', "about", "gender", "age", "skills"];
    const isUpdatedAllowed = Object.keys(data).every((k) =>  ALLOWED_UPDATES.includes(k));
    if(!isUpdatedAllowed){
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

module.exports = profileRouter;