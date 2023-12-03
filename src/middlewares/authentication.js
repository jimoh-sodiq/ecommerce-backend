import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js";
import { UnauthenticatedError, UnauthorizedError } from "../errors/index.js";
import {
  isTokenValid
} from "../utils/index.js";

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;

  if (!token) {
    throw new UnauthenticatedError("You are not logged in");
  }
  try {
    const payload = isTokenValid({ token });
    req.user = {
      name: payload.name,
      userId: payload.userId,
      role: payload.role,
    };
    next();
  } catch (error) {
    throw new UnauthenticatedError("You are not logged in");
  }
};

const authorizePermissions = (...roles) => {
  return async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError(
        "You are not authorized to access this route"
      );
    }
    next();
  }
}

export { authenticateUser, authorizePermissions };
