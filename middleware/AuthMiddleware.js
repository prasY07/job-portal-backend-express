
// import { jwtConfig } from "../jwt.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { errorResponse } from "../helpers/ResponseBuilder.js";

export const verifyUserByToken = async (req, res, next) => {
  const token = req.headers.authorization; // Extract the token from the request headers

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const jwtSecret = process.env.jwtSecret;

    const tokenWithoutBearer = token.replace('Bearer ', '');
    const decoded = jwt.verify(tokenWithoutBearer, jwtSecret); // Verify the token
    const user = await User.findOne({ tokens: tokenWithoutBearer });

    if (user) {
      req.user = user; // Attach the user object to the request
      next(); // Continue to the next middleware or route
    } else {
        return res.status(404).json(errorResponse("User not found"));
    }
  } catch (error) {
    console.error(error);
    return res.status(401).json(errorResponse("Token is invalid"));
  }
};

