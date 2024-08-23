import { Request, Response } from "express";
import playlist from "../models/playlist";
import { AddSongBody, CreatePlaylistBody } from "../types/playlist";
import mongoose, { ObjectId } from "mongoose";

export const CreatePlaylist = async (req: Request<{}, {}, CreatePlaylistBody>, resp: Response) => {
    // @ts-ignore
    console.log(req.user)
    try {
        const { name } = req.body
        const data = await playlist.create({
            name: name,
            // @ts-ignore
            ownedby: req.user
        })
        resp.status(200).json(data)
    } catch (error) {
        console.log(error)
        resp.status(400).json(error)
    }
}

export const AddSong = async (req: Request<{}, {}, AddSongBody>, resp: Response) => {
    try {
        const { name, id } = req.body
        if (!id) {
            return resp.status(400).json({ message: 'Song ID is required' });
        }
        const songId = new mongoose.Types.ObjectId(id)
        // const userId = req.user?._id;
        const data = await playlist.updateMany({
            name: { $in: name }
        }, {
            $push: { songs: songId }
        })
        resp.status(200).json(data)
    } catch (error) {
        console.log(error)
        resp.status(400).json(error)
    }
}

export const GetPlaylistSongs = async(req: Request, resp: Response) => {
    try {
        const { name } = req.body
        const data = await playlist.aggregate([
            {
                $match: { name: name }
            },
            {
                $lookup: {
                  from: 'songs',  
                  localField: 'songs', 
                  foreignField: '_id',
                  as: 'songs'
                }
            }
        ])
        resp.status(200).json(data)
    } catch (error) {
        console.log(error)
        resp.status(400).json(error)
    }
}

export const GetPlayList = async(req:Request,resp:Response)=>{
    try {
        const data = await playlist.find({
            // @ts-ignore
            ownedby : req.user
        })
        resp.status(200).json(data)
    } catch (error) {
        
    }
}