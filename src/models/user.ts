import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name : {
        type:String,
        require: true
    },
    username : {
        type: String,
        require:true
    },
    email : {
        type: String,
        require:true
    },
    password :{
        type: String,
        require:true
    },
    userid : mongoose.SchemaTypes.ObjectId
})

export default mongoose.model("user",UserSchema)