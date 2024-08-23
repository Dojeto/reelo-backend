import { Router } from "express";
import { Login,Register,isVerified } from "../controller/user";
import { auth } from "../middleware/authorization";
export const user = Router()

user.post('/login',Login)
user.post('/signup',Register)
user.get('/is-verified',auth,isVerified)