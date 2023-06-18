import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js";
import { UnauthenticatedError } from "../errors/index.js";
import {
  createResponse,
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
} from "../utils/global.js";
import jwt from "jsonwebtoken";

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;

  if (!token) {
    throw new UnauthenticatedError("You are not logged in");
  }
  try {
    const payload = isTokenValid({token})
    req.user = { name: payload.name, userId: payload.userId, role: payload.role}
    console.log(payload)
    next();
  } catch (error) {
    throw new UnauthenticatedError("You are not logged in oo");
  }
};

export default authenticateUser;
