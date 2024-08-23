import mongoose from "mongoose";

const PlaylistSchema = new mongoose.Schema({
    name : {
        type:String,
        require: true
    },
    ownedby : {
        type: mongoose.Schema.ObjectId,
        require:true
    },
    songs : {
        type: Array<mongoose.ObjectId>,
    },
    playlistid : mongoose.SchemaTypes.ObjectId
})

export default mongoose.model("playlist",PlaylistSchema)