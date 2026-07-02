import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signupUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create user
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        res.status(201).json({ message: "User created successfully", user: newUser });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}
    export const login = async (req, res) => {
          try {
        const { email, password }=req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        const isPasswordValid=await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            return res.status(400).json({message:"invalid password"});

        }
        else{
            const token=jwt.sign(
                {id:user._id},
                process.env.JWT_SECRET,
                {expiresIn:"1h"}
            );
            res.status(200).json(
                {
                    message:"Login successful",
                token,
                user,
            },
            );
        }
    }catch (error) {
    console.error(error);

    res.status(500).json({
        message: "Internal server error",
        error: error.message
    });
}
    }
