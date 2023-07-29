import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export async function verifyToken(req, res, next) {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("Unauthorized");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
}

export default verifyToken;
