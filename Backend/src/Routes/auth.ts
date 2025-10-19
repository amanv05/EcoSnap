import { Router } from "express";
import { signinUser, signupUser } from "../Controllers/authController.js";
const userRouter = Router();

userRouter.post("/signup", signupUser);
userRouter.post("/signin", signinUser);

export default userRouter;