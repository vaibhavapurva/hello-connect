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

const validateProfileDateUpdate = (req) =>{
    const  ALLOWED_UPDATES = ["userId",'userImage', "about", "gender", "age", "skills"];
    const isUpdatedAllowed = Object.keys(req.body).every((k) =>  ALLOWED_UPDATES.includes(k));
    return isUpdatedAllowed
}

const passwordValition = (req) =>{
    if(!validator.isStrongPassword(req.body.newPassword)){
        throw new Error("newPassword is not strong please try another")
    }
    else if(req.body.currentPassword === req.body.newPassword){
        throw new Error("newPassowrd is match oldPassword please user another password")
    }
}

module.exports = {validateSignUpData,
    validateProfileDateUpdate,
    passwordValition
}