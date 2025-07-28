import userModel from "../models/userModel.js";
import validator from "validator";
import JWT from "jsonwebtoken";
import bcrypt from "bcrypt";
import { createError, createSuccess } from "../config/response.js";

export const createToken = (id) => {
  return JWT.sign({ id }, process.env.TOKEN);
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await userModel.findOne({ email });
    if (!user) {
      res.json({ success: false, message: "this email doesnt exist " });
    }

    let isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.json({ sucess: false, message: "Invalid Condetionals " });
    } else if (isMatch && user) {
      const token = createToken(user._id);
      res.json({ success: true, token });
    }
  } catch (error) {
    console.log(error);

    res.send({ success: false, message: error.message });
  }
};

// user registration
export const signInUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exist = await userModel.findOne({ email });

    if (exist) {
      return res.send({ success: false, msg: "this email is already exist" });
    }
    if (!validator.isEmail(email)) {
      return res.send({ success: false, msg: "please enter a valid email" });
    }

    if (password.length < 8) {
      return res.send({
        success: false,
        msg: "please enter a strong password",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const user = await userModel({
      name,
      email,
      password: hashPassword,
    });

    let save = await user.save();
    let token = createToken(save._id);
    return res.send({ success: true, token });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
};

// ADmin login
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.send({ success: false, message: "Invalid credentials" });
    }

    const token = JWT.sign(
      email + password,
      process.env.TOKEN_ADMIN // ✅ make sure this is defined
    );

    return res.send({
      success: true,
      token, // ✅ yeh zaroor bhejna hai
      message: "Login successful",
    });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
};
