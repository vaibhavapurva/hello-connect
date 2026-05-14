const express = require("express");
const { connectDB } = require("./config/database");
const app = express();
const User = require("./models/user");
const {validateSignUpData} =  require("./utils/validation");

const cookiesParser = require("cookie-parser");
const jwt = require("jsonwebtoken")
const {userAuth} = require("./middlewares/auth");
const authRouter = require("./routers/auth");
const profileRouter = require("./routers/profile");
const requestRouter = require("./routers/request");
app.use(express.json());
app.use(cookiesParser());


app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.get("/feed" , async(req, res) => {
    try{
        const users = await User.find({});
        res.send(users)
    }catch(err){
        res.status(400).send("somthing want  worng")
    }
});


app.delete("/user" , async(req, res) =>{
  const userID = req.body.userID;
  try{
    const user = await  User.findByIdAndDelete(userID);
    res.send("user deleted")
  }catch(err){
        res.status(400).send("somthing want  worng")
    }
})



app.get("/user" , async(req, res) =>{
    const userEmail = req.body.email;

    try{
        const user = await  User.findOne({email: userEmail});
        res.send(user)
    }catch(err) {
        res.status(404).send("user can not finds")
    }
})


connectDB()
  .then(() => {
    console.log("data base connect");

    app.listen(3000, () => {
      console.log("server is run 3000 port");
    });
  })
  .catch((err) => {
    console.log("database can't be connected -", err);
  });
