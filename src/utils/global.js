import jwt from "jsonwebtoken";

/**
 *
 * @param {boolean} success true | false
 * @param {string} message error text
 * @param {object | null} data { key: value }
 * @returns {{}}
 */

export function createResponse(success, data = null, message = "") {
  return {
    success,
    data,
    message,
  };
}

/**
 * @param {{key: value}} payload
 * @tutorial it creates a jwt token
 * @returns string
 */

export function createJWT({ payload }) {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
}

export function isTokenValid({ token }) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

export function attachCookiesToResponse({ res, user }) {
  const token = createJWT({ payload: user });
  res.cookie("token", token, {
    httpOnly: process.env.NODE_ENV == "production" ? true : false,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    secure: process.env.NODE_ENV == "production" ? true : false,
    signed: true,
  });
}
