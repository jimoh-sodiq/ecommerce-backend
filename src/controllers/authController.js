import { StatusCodes } from 'http-status-codes';
import User from "../models/userModel.js";
import { createResponse } from "../utils/global.js";

export async function register(req, res) {
  const { email, password, name } = req.body;
  const existingUser = await User.findOne({ email });
  // if(existingUser){
  //     return re
  // }
  res.status(200).json(req.body);
}

export async function login(req, res) {
  res.send("login constroller");
}

export async function logout(req, res) {
  res.send("logout constroller");
}
