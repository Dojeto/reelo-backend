import mongoose from "mongoose"
import library from "./library"

const uri = process.env.MONGO_URL || "mongodb://db:27017/reelo-db"

export const connectToDb = async () => {
    try {
        console.log(uri)
        const conn = await mongoose.connect(uri)
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        await library.deleteMany({})
        await library.insertMany([
            { name: "Song One", artist: "Artist One", link: "http://commondatastorage.googleapis.com/codeskulptor-demos/riceracer_assets/music/race2.ogg" },
            { name: "Song Two", artist: "Artist Two", link: "http://commondatastorage.googleapis.com/codeskulptor-assets/sounddogs/soundtrack.ogg" },
            { name: "Theme", artist: "Artist Three", link: "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/theme_01.mp3" }
        ])
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}