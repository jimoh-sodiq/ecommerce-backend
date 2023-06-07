import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js";
import { createResponse, createJWT, isTokenValid } from "../utils/global.js";
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

  const tokenUser = { name: user.name, userId: user._id, role: user.role };

  const token = createJWT({ payload: tokenUser });
  res.cookie('token', token, { httpOnly: true, expires: new Date(Date.now() + 24 * 60 * 60 * 1000) });
  res
    .status(StatusCodes.CREATED)
    .json(createResponse(true, { user: tokenUser }));
}

export async function login(req, res) {
  res.send("login constroller");
}

export async function logout(req, res) {
  res.send("logout constroller");
}
