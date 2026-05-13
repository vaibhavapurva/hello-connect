const mongoose = require("mongoose");
const validator = require("validator");
const UserSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,

    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value){
        if(!validator.isEmail(value)){
            throw new Error(" please enter valid email addresss" + value)
        }
      }
    },
    password: {
      type: String,
      required: true,
      validate(value){
        if(!validator.isStrongPassword(value)){
            throw new Error(" please enter strong password" + value)
        }
      }
    },
    age: {
      type: Number,
      min: 18
    },
    gender: {
      type: String,
    },
    userImage:{
        type: String,
         default: "https://pbs.twimg.com/profile_images/864104988146114560/MSWTWwno_400x400.jpg",
    },
    about:{
        type: String,
    },
    skills: {
        type: [String],
    }
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
