import type {Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken";


const middleware = (req: Request, res: Response, next: NextFunction) => {
try { 
  const token = req.body.token;
  const verified = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };

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
        message: "Interna server error",
    })
}
}

export default middleware
