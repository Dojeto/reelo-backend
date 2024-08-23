import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();

const jwtSecret = process.env.jwtSecret || "dojeto"

const jwtGenerator = (user_id:string)=>{
    const payload = {
        user : user_id
    }
    return jwt.sign(payload,jwtSecret,{expiresIn:"2hr"})
}

export default jwtGenerator;