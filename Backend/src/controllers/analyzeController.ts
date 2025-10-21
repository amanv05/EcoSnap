import { type Request, type Response } from "express";
import { uploadOnCloud } from "../services/cloudinaryService.js";
import classifyImage from "../services/classifyService.js";
import tipsGenerate from "../services/tipService.js";
import { analyzeModel } from "../models/analyzeData.js";
import { userModel } from "../models/userData.js";

const analyzeImage = async (req: Request, res: Response) => {
    try{
    const userID = req.userID;
    const localFile = req.file?.path;

    if(!userID) {
        return res.status(401).json({
            message: "user not signed in",
        })
    }

    if(!localFile) {
        return res.status(400).json({
            message: "image not given",
        })
    }

    const imageURL = await uploadOnCloud(localFile);
    if(!imageURL) {
        return res.status(400).json({message: "image is not uploaded"});
    }

    const objectName = await classifyImage(imageURL);
    if(!objectName) {
        return res.status(400).json({message: "error while classifying image"});
    }

    const result = await tipsGenerate(objectName);
    if(!result) {
        res.status(400).json({message: "error while generating tips"});
    }

    const analyzedData = await analyzeModel.create({
        userID,
        category: result.category,
        objectName: objectName,
        isRecyclable: result.isRecyclable,
        tip: result.recyclingTip,
        imageUrl: imageURL,
        createdAt: new Date(),
    });

    const increasePoint = await userModel.findByIdAndUpdate(userID, 
        { $inc: { points :5 }},
        { new: true },
    );

    if(analyzedData && increasePoint) {
        return res.status(201).json({
            analyzedData,
            newPoints: increasePoint.points,
            pointsAdded: 5,
        })
    }
} catch (e) {
    console.error("error while analyzing image: ", e );
    res.status(500).json({
        message: "Internal server error",
    });
}
};

export default analyzeImage;
