import mongoose from "mongoose"

export const DBConnect = async() => {
    await mongoose.connect(process.env.DB_URL as string);
}