import { Router } from "express";
import { GetSongsList } from "../controller/library";
export const library = Router()

library.get('/songs',GetSongsList)