import { Router } from "express";
import { signinUser, signupUser } from "../controllers/userController.js";
const userRouter = Router();

userRouter.post("/signup", signupUser);
userRouter.post("/signin", signinUser);

export default userRouter;