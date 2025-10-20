import { Router } from "express";
import analyzeImage from "../controllers/analyzeController.js";
import { upload } from "../middleware/upload.js";
import middleware from "../middleware/middleware.js";
const analyzeRouter =  Router();

analyzeRouter.post("/analyze", middleware, upload.single("image"), analyzeImage);

export default analyzeRouter;