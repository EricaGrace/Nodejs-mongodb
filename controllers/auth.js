import User from "./../models/user.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export async function login(req, res) {
  try {
    const userName = req.body.userName;
    const user = await User.findOne({ userName: userName });

    if (!user) {
      return res.status(400).send("Error: Invalid password or username.");
    }

    const password = req.body.password;
    const userHashPassword = user.password;
    const passwordIsValid = bcrypt.compareSync(password, userHashPassword);

    if (!passwordIsValid) {
      return res.status(400).send("Error: Invalid password or username.");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: 7200,
    });

    res.status(200).json({ accessToken: token });
  } catch (err) {
    return res.status(500).send({ error: err.toString() });
  }
}
