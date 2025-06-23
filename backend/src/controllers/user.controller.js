import httpStatus from "http-status";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import { hash } from "crypto";
import crypto from "crypto";

const register = async (req, res) => {
  const { name, username, password } = req.body;
  try {
    const existUser = await User.findOne({ username });

    if (existUser) {
      return res
        .status(httpStatus.FOUND)
        .json({ message: "User Already Exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name: name,
      username: username,
      password: hashedPassword,
    });

    await newUser.save();

    res
      .status(httpStatus.CREATED)
      .json({ message: "User Registered successfully" });
  } catch (error) {
    console.error(error);
    res.json({ message: `Something went wrong ${error}` });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Please provide Email and Password" });
  }
  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "User Not Found" });
    }

    if (bcrypt.compare(password, user.password)) {
      let token = crypto.randomBytes(20).toString("hex");
      user.token = token;

      await user.save();

      return res.status(httpStatus.OK).json({ token: token });
    }
  } catch (e) {
    return res.status(500).json({message:`Something went wrong: ${e}`})
  }
};


export {login, register}