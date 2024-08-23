import { Response, Request } from "express"
import library from "../models/library"

export const GetSongsList = async(req:Request,resp:Response) => {
    const data = await library.find()
    resp.status(200).json(data)
}