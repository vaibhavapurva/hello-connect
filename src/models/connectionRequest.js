const mongoose =  require('mongoose');


const connectionRequestModule = new mongoose.Schema({
    formUserId : {
        type: mongoose.Schema.Types.ObjectId,
        required : true
    },
    toUserId : {
        type: mongoose.Schema.Types.ObjectId,
        required : true
    },
    status: {
        type:  String,
        required: true,
        enum:{
            values: ["ignored", "interested", "accepeted", "rejected"],
            message : `{VALUE} is not valid type`
        }
    }
},{
    timestamps: true
}

)


connectionRequestModule.index({formUserId: 1, toUserId: 1});

// connectionRequestModule.pre("save",function(req) {
//     const connectionRequest = this;
//     if(connectionRequest.formUserID.equals(connectionRequest.toUserId)){
//         throw new Error("can not send request your self")
//     }
// })
const ConnectionRequest = mongoose.model("ConnectionRequest" , connectionRequestModule)

module.exports = ConnectionRequest;