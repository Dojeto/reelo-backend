import jwt from 'jsonwebtoken'
import { config } from 'dotenv';
import { Request,Response,NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';

config();
interface CustomJwtPayload extends JwtPayload {
    user: string;
}
const jwtSecret = process.env.jwtSecret || "dojeto"
export const auth = async(req:Request,resp:Response,next:NextFunction)=>{
        
        const jwtToken = req.cookies.user

        if(!jwtToken)
        {
            return resp.status(403).send("Not Authorize");
        }

        try {
            const verify = jwt.verify(jwtToken, jwtSecret) as CustomJwtPayload;
            // @ts-ignore
            req.user = verify.user;
            next();
          } catch (err) {
            resp.status(401).json({ msg: "Token is not valid" });
          }
}