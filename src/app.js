const express = require("express");
const { connectDB } = require("./config/database");
const app = express();
const User = require("./models/user");


app.post("/signup", async(req, res) => {
 const UserObj = {
    firstName : "vaibhav",
    lastName : "Apurva",
    email : "vaibhavapurva17@gmail.com",
    password : "vaibhav@123",
    age: 27,
    gender : "m"
 }
 const user = new User(UserObj)
 const userData = await user.save();
 res.send("userDate addded" , userData)
});



connectDB()
  .then(() => {
    console.log("data base connect");

    app.listen(3000, () => {
      console.log("server is run 3000 port");
    });
  })
  .catch((err) => {
    console.log("database can't be connected", err);
  });
 