import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js";
import { BadRequest, NotFoundError } from "../errors/index.js";
import {
  createResponse,
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
} from "../utils/global.js";
import jwt from "jsonwebtoken";

export async function getAllUsers(req, res) {
  const users = await User.find({ role: "user" }).select("-password");
  if (!users) {
    throw new NotFoundError("No users found");
  }
  res.status(StatusCodes.OK).json(createResponse(true, { users }));
}

export async function getSingleUser(req, res) {
  const user = await User.findOne({ _id: req.params.id }).select("-password");
  if (!user) {
    throw new NotFoundError("No user with this id");
  }
  res
    .status(StatusCodes.OK)
    .json(createResponse(true, { userData: user }, "user found"));
}

export async function showCurrentUser(req, res) {
  res
    .status(StatusCodes.OK)
    .json(
      createResponse(true, { user: req.user }, "user retrieved successfully")
    );
}

export async function updateUser(req, res) {
  res.send(req.body);
}

export async function updateUserPassword(req, res) {
  const {oldPassword, newPassword} = req.body
  if(!oldPassword || !newPassword) {
    throw new BadRequest("Please provide old and new password")
  }
  if(oldPassword === newPassword) {
    throw new BadRequest("New password cannot be the same as old password")
  }
  const user = await User.findOne({_id: req.user.userId})
  if(!user) {
    throw new NotFoundError("User not found")
  }
  const isPasswordCorrect = await user.comparePassword(oldPassword)
  if(!isPasswordCorrect) {
    throw new BadRequest("Incorrect password")
  }
  user.password = newPassword
  await user.save()
  res.status(StatusCodes.OK).json(createResponse(true, {}, "password updated successfully"));
}
