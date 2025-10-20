import type {Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken";
const JWT_SECRET =  process.env.JWT_SECRET;


const middleware = (req: Request, res: Response, next: NextFunction) => {
try { 
  const authHeader = req.headers["authorization"];

  if(!authHeader){
    return res.status(401).json({message: "token not provided"});
  }

  const token = (authHeader as string).split(" ")[1];
  
  const verified = jwt.verify(token as string, JWT_SECRET as string) as { id: string };

  if(!verified) {
    return res.status(401).json({message: "invalid token"});
  }

  if(verified) {
    req.userID = verified.id;
    next();
  } else {
    return res.status(401).json({
        message: "user not signed in",
    })
  }
} catch(e) {
    console.error("middleware error:", e);
    return res.status(500).json({
        message: "Internal server error",
    })
}
}

export default middleware
