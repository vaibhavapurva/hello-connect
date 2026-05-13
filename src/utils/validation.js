const validator = require("validator");

const validateSignUpData = (req) =>{

    const {firstName, lastName, password, email } = req.body;

    if(!firstName || !lastName){
        throw new Error(" please enter name proper");
    }
    else if(!validator.isEmail(email)){
        throw new Error("please enter valid email id")
    }else if(!validator.isStrongPassword(password)){
        throw new Error("Please enter Strong passWordds")
    }

}

module.exports = {validateSignUpData}