import { Response, Request } from "express";
import { LoginBody, RegisterBody } from "../types/user";
import bcrypt from 'bcrypt'
import user from "../models/user"
import jwtGenerator from "../utils/jwtGenerator";
import mongoose from "mongoose";

export const Login = async (req: Request<{}, {}, LoginBody>, resp: Response) => {
    try {

        const { email, password } = req.body

        const checkUser = await user.find({
            email: email
        })
        if (!checkUser) {
            return resp.status(401).json("User Dosen't Exists")
        }

        const validPass = await bcrypt.compare(password, checkUser[0].password!)


        if (!validPass) {
            return resp.status(401).json("Wrong Password");
        }

        const token = jwtGenerator(checkUser[0]._id.toString());
        // resp.set
        resp.cookie("user", token, {
            expires: new Date(Date.now() + 31536000000),
            httpOnly: true,
            path: '/',
            secure: true,
            sameSite: "none"
        })
        resp.status(200).json({ token })

    } catch (err) {
        console.log(err)
        resp.status(500).json("Server Error")

    }
}

export const Register = async (req: Request<{}, {}, RegisterBody>, resp: Response) => {
    try {

        const { name, username, email, password } = req.body

        const checkUser = await user.find({
            email: email
        })
        console.log(checkUser.length)
        if (checkUser.length != 0) {
            return resp.status(401).json("User Already Exists")
        }

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);

        const bcryptPassword = await bcrypt.hash(password, salt);

        const newUser = await user.create({
            name: name,
            email: email,
            username: username.toLowerCase(),
            password: bcryptPassword
        })

        const token = jwtGenerator(newUser._id.toString());

        resp.cookie("user", token,{
            expires: new Date(Date.now() + 31536000000),
            httpOnly: true,
            path: '/',
            secure: true,
            sameSite: "none"
        })
        resp.status(200).json({ token })

    } catch (err) {
        console.log(err)
        resp.status(500).json("Server Error")
    }
}

export const isVerified = async(req: Request, resp: Response) => {
    try {
        //@ts-ignore
        const checkUser = await user.findById(req.user)
        resp.status(200).json(checkUser);
    } catch (error) {
        console.log(error);
        resp.status(500).send("server Error");
    }
}