import mongoose from "mongoose";

const MusicLibrary = new mongoose.Schema({
    name : {
        type:String,
        require: true
    },
    artist: {
        type:String,
        require: true
    },
    link : {
        type:String,
        require: true
    },
    songid : mongoose.SchemaTypes.ObjectId
})

export default mongoose.model("songs",MusicLibrary)