import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import userModel from "../model/userSchema";
import { generatToken } from "../util/jwt";
import bcrypt from "bcryptjs";
import { jwtVerify } from "jose";

//@desc     Auth user/set token
//route     POST /api/users/login
//@access  Public
export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    const exist = await userModel.findOne({ email });
    if (exist) {
      res.status(400);
      throw new Error("user is alredy exist");
    }
    const user = await userModel.create({
      name,
      email,
      password,
    });

    if (user) {
      const userId = user._id || " ";
      const token = generatToken(userId);
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        path: "/",
      });
      res.status(200).json({
        success: true,
        message: "user successfully created",
        data: user,
        token
      });
    } else {
      res.status(400);
      throw new Error("somthing is issue user not create");
    }
  }
);

//@desc     Auth register user
//route     POST /api/users/register
//@access  Public
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("user is  note founde");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(400);
    throw new Error("password is incorrect");
  } else {
    const userId = user._id || " ";
    const token = generatToken(userId);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      path: "/",
    });
    res.status(200).json({
      success: true,
      message: "user successfully  logined",
      data: user,
    });
  }
});

//@desc      logout user
//route     POST /api/users/logout
//@access  Public
export const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "user is logout succefully" });
});

//@desc     get vuser profile
//route     POST /api/users/profile
//@access  Privet
export const getUserProfile = asyncHandler(
  async (req: Request, res: Response) => {
    res.status(200).json({ message: "profile api" });
  }
);

//@desc     update user profile
//route     PUT /api/users/profile
//@access  Privet
export const updateUserProfile = asyncHandler(
  async (req: Request, res: Response) => {
    res.status(200).json({ message: "update user api" });
  }
);


// @desc  check user is valid or note
// roue   GET /api/users/check
// @access  Publick
export const checkUser = asyncHandler(async (req:Request,res:Response) => {
  const token = req.cookies.jwt;
  if (!token) {
     throw new Error("user is note login");
    }
    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET || " "
    );
    const {payload}=await jwtVerify(token,secret)
    const user = await userModel.findOne({ _id:payload.userId }).exec();
    if (!user) {
      throw new Error("user is note login");
    }
    res.status(200).json({message:"user is valid",success:true,user})

  })
