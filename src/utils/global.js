import jwt from "jsonwebtoken";

/**
 *
 * @param {*} success true | false
 * @param {*} errorMessage error text
 * @param {*} data { key: value }
 * @returns void
 */

export function createResponse(success, data = null, errorMessage = null) {
  return {
    success: success,
    data: data,
    message: errorMessage,
  };
}

/**
 * @param {*}
 * @tutorial it creates a jwt token
 */

export function createJWT({ payload }) {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
}

export function isTokenValid({ token }) {
  jwt.verify((token, process.env.JWT_SECRET));
}
