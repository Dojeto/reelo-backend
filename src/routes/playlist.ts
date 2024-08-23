import { Router } from "express";
import { CreatePlaylist, AddSong, GetPlaylistSongs, GetPlayList } from "../controller/playlist";
import { auth } from "../middleware/authorization";
export const playlist = Router()

playlist.post('/create-playlist',auth,CreatePlaylist)
playlist.post('/add-song',auth,AddSong)
playlist.post('/playlist-songs',auth,GetPlaylistSongs)
playlist.get('/get-playlist',auth,GetPlayList)