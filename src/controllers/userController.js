import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js";
import { BadRequest, NotFoundError } from "../errors/index.js";
import {
  createResponse,
  checkPermissions,
  attachCookiesToResponse,
} from "../utils/index.js";
import jwt from "jsonwebtoken";
import createTokenUser from '../utils/createTokenUser.js';

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
  checkPermissions(req.user, user._id)
  // if(user._id != req.user.userId) {
  //   throw new BadRequest("Sorry, you are not allowed to view other users");
  // }
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

// USING USER.SAVE() (pre save hook is called)
export async function updateUser(req, res) {
  const {email, name} = req.body
  if(!email || !name){
    throw new BadRequest("Please provide email and name")
  }
  const user = await User.findOne({_id: req.user.userId})
  if(!user) {
    throw new NotFoundError("User not found, please contact support if you think this is a mistake")
  }
  user.email = email
  user.name = name
  await user.save()

  const tokenUser = createTokenUser(user)
  attachCookiesToResponse({res, user: tokenUser})
  res.status(StatusCodes.OK).json(createResponse(true, {user:tokenUser},"user details updated successfully"))

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


// USING FIND_ONE_AND_UPDATE (pre save hook is not called)
// export async function updateUser(req, res) {
//   const {email, name} = req.body
//   if(!email || !name){
//     throw new BadRequest("Please provide email and name")
//   }
//   const user = await User.findOneAndUpdate({_id:req.user.userId}, {email, name}, {new: true, runValidators: true})
//   if(!user) {
//     throw new NotFoundError("User not found, please contact support if you think this is a mistake")
//   }
//   const tokenUser = createTokenUser(user)
//   attachCookiesToResponse({res, user: tokenUser})
//   res.status(StatusCodes.OK).json(createResponse(true, {user:tokenUser},"user details updated successfully"))

// }