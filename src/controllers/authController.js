import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js";
import { createResponse } from "../utils/global.js";

export async function register(req, res) {
  const { email, password, name } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json(createResponse(false, null, "Email already exists"));
  }
  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json(createResponse(true, { user }));
}

export async function login(req, res) {
  res.send("login constroller");
}

export async function logout(req, res) {
  res.send("logout constroller");
}
