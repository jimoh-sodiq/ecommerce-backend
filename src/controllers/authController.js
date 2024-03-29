import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js";
import { BadRequest, NotFoundError } from "../errors/index.js";
import {createTokenUser, createResponse, attachCookiesToResponse} from '../utils/index.js';
import jwt from "jsonwebtoken";

export async function register(req, res) {
  const { email, password, name } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(createResponse(false, null, "Email already exists"));
  }

  const userCount = await User.countDocuments({});
  const role = userCount ? "user" : "admin";
  const user = await User.create({ email, password, name, role });

  const tokenUser = createTokenUser(user);

  attachCookiesToResponse({ res, user: tokenUser });
  res
    .status(StatusCodes.CREATED)
    .json(createResponse(true, { user: tokenUser}, "user created successfully"));
}

export async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequest("Please provide email and password");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new NotFoundError("Invalid credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new BadRequest("Password is incorrect");
  }
  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res: res, user: tokenUser });
  res.status(StatusCodes.OK).json(createResponse(true, { user: tokenUser }, "logged in successfully"));
}

export async function logout(req, res) {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json(createResponse(true, null, "Logged out successfully"));
}
