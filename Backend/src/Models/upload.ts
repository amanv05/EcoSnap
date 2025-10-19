import mongoose from "mongoose";

const analyzeSchema = new mongoose.Schema({
    imageUrl: { type: String, required: true },
    Name: { type: String, required: true },
    category: { type: String, required: true },
    tip: { type: String, required: true },
    userID: { type: mongoose.Types.ObjectId, required: true, ref: "User"},
    pointsGiven: { type: Number, required: true },
    createdAt: { type: Date, reqquired: true }
})

export const analyzeModel = mongoose.model("Analyze", analyzeSchema);