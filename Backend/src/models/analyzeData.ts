import mongoose from "mongoose";

const analyzeSchema = new mongoose.Schema({
    imageUrl: { type: String, required: true },
    objectName: { type: String, required: true },
    category: { type: String, required: true },
    isRecyclable: { type: Boolean, required: true },
    tip: { type: String, required: true },
    userID: { type: mongoose.Types.ObjectId, required: true, ref: "User"},
    createdAt: { type: Date, default: Date.now }
})

export const analyzeModel = mongoose.model("Analyze", analyzeSchema);