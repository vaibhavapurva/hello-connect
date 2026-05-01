const express = require("express");

const app = express();

app.use("/hello",(req, res)=>{
    res.send(" hellodd brother ")
})

app.use("/test" , (req, res) =>{
    res.send(" hello form test side")
})

app.listen(3000, () =>{
    console.log("server is run 3000 port")
})