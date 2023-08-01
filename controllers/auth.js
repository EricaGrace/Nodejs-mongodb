import User from "./../models/user.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import express from "express";
import { body, validationResult } from "express-validator";

dotenv.config();

export async function login(req, res) {
  try {
    // Valider les champs "userName" et "password" fournis par l'utilisateur
    await body("userName")
      .notEmpty()
      .withMessage("Le nom d'utilisateur est requis.")
      .run(req);
    await body("password")
      .notEmpty()
      .withMessage("Le mot de passe est requis.")
      .run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userName = req.body.userName;
    const password = req.body.password;

    const user = await User.findOne({ userName: userName });

    if (!user) {
      return res.status(400).send("Error: Invalid password or username.");
    }

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
