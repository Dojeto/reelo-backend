import express from "express"
import { config } from "dotenv"
import { connectToDb } from "./models/database"
import cors from "cors"
import corsOptions from "./config/corsOptions"
import { user } from "./routes/user"
import { playlist } from "./routes/playlist"
import { library } from "./routes/library"
import cookieParser from 'cookie-parser';

const port = process.env.PORT || 3000

const app = express()

config()
app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())
app.use("/",user)
app.use("/",playlist)
app.use("/",library)

app.get("/",(req,resp)=>{
    resp.send("Test")
})

connectToDb().then(() => {
    app.listen(port, () => {
        console.log(`Running On Server ${port}`)
    })
})

export default app