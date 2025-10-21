import { Router } from "express";
import { signinUser, signupUser, userHistory } from "../controllers/userController.js";
import middleware from "../middleware/middleware.js";
import { getLeaderboard } from "../controllers/userController.js";
const userRouter = Router();

userRouter.post("/signup", signupUser);
userRouter.post("/signin", signinUser);
userRouter.get("/history", middleware, userHistory);
userRouter.get("/leaderboard", middleware, getLeaderboard);

export default userRouter;