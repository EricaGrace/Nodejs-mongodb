import User from "./../models/user.js";
import bcrypt from "bcryptjs";

/**
 * Get all users
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export async function getUsers(req, res, next) {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}

/**
 * Get a user
 * @param {*} req
 * @param {*} res
 */
export async function getUser(req, res) {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}

/**
 * Create user
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
export async function createUser(req, res, next) {
  const { firstName, lastName, email, password, userName } = req.body;
  if (!(email && password && firstName && lastName && userName)) {
    return res.status(400).json({
      message: "Validation failed, entered data is incorrect.",
    });
  }

  try {
    const existingUser = await User.findOne({ userName: req.body.userName });
    const existingEmail = await User.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(400).json({ error: "User name already in use." });
    }

    if (existingEmail) {
      return res.status(400).json({ error: "Email already in use." });
    }

    let encryptedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      userName: userName,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: encryptedPassword,
    });

    await user
      .save()
      .then((result) => {
        return res.status(200).json({
          message: "User created successfully!",
          user: result,
        });
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: err.toString() });
      });
  } catch (error) {
    return res.status(400).json({ error: error.toString() });
  }
}

/**
 * Update user
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
export async function updateUser(req, res, next) {
  const { firstName, lastName, email, password, userName } = req.body;
  if (!(email && password && firstName && lastName && userName)) {
    return res.status(400).json({
      message: "Validation failed, entered data is incorrect.",
    });
  }

  const updatedInfo = Object.keys(req.body);
  const id = req.params.id;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    if (updatedInfo.includes("userName")) {
      const existingUser = await User.findOne({
        userName: req.body.userName,
        _id: { $ne: id },
      });
      if (existingUser) {
        return res.status(400).json({ error: "User name already in use." });
      }
    }

    if (updatedInfo.includes("email")) {
      const existingEmail = await User.findOne({
        email: req.body.email,
        _id: { $ne: id },
      });
      if (existingEmail) {
        return res.status(400).json({ error: "Email already in use." });
      }
    }

    updatedInfo.forEach((update) => (user[update] = req.body[update]));
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.toString() });
  }
}

/**
 * Delete user
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
export async function deleteUser(req, res, next) {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndRemove(id);
    return res.status(200).json({ message: "User deleted" });
  } catch (error) {
    return res.status(400).json({ error: error.toString() });
  }
}
