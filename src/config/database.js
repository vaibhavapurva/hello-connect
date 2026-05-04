const mongoose = require("mongoose");


const connectDB = async ( ) =>{
    await mongoose.connect("mongodb+srv://vaibhavapurva17_db_user:PBWKiaP7G1w83Ccf@namastenode.fq0pxy0.mongodb.net/connect_dev")
}

module.exports = {connectDB}
