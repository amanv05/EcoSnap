import { type Request, type Response } from "express"
import z from "zod";
import { userModel } from "../Models/user.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config();


export const signupUser = async (req: Request, res: Response) => {
    const requiredBody = z.object({
        firstName: z.string().min(4).max(8),
        lastName: z.string().min(4).max(8),
        email: z.email(),
        password: z.string().min(8).max(8),
    });
try {
    const parsedBody = requiredBody.safeParse(req.body);

    if(!parsedBody.success) {
        return res.status(400).json({
            message: "Invalid Inputs",
            error: parsedBody.error,
        });
    }

    const { firstName, lastName, email, password } = parsedBody.data;

    const userExist = await userModel.findOne({
        email: email,
    });

    if(userExist) {
        return res.status(409).json({
            message: "User already exists",
        });
    }
    
    const hashedPassword = await bcrypt.hash(password, 8);

    const userCreated = await userModel.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
    });

    if(userCreated) {
        return res.status(201).json({
            message: "User signed up",
        })
    }
} catch (e) {
    console.error("Error while signing up:", e );
    return res.status(500).json({
        message: "Server error",
    });
}
}

export const signinUser = async (req: Request, res: Response) => {
    const requiredBody = z.object({
        email: z.email(),
        password: z.string().min(8).max(8),
    });
try {
    const parsedBody = requiredBody.safeParse(req.body);

    if(!parsedBody.success){
        return res.status(400).json({
            message: "Invalid inputs",
            error: parsedBody.error,
        })
    }

    const { email , password } = req.body;

    const userFind = await userModel.findOne({
        email,
    });

    if(!userFind) {
        return res.status(409).json({
            message: "User not exists",
        });
    }

    const passwordMatch = await bcrypt.compare(password,userFind.password);

    if(!passwordMatch) {
        return res.status(401).json({
            message: "Incorrect password",
        });
    }

    if(userFind && passwordMatch) {
        const token = jwt.sign({
            id: userFind._id
        }, process.env.JWT_SECRET as string);

        return res.status(201).json({
        message: "User Signed in successfully",
        token: token
    })
    }
} catch (e) {
    console.error("error while signing in", e);
    return res.status(500).json({
        message: "Server error",
    });
}
}