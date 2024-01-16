import { comparePassword, hashPassword } from "../helper/authHelper.js";
import userModels from "../model/userSchema.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { email, password, userName } = req.body;
    console.log(email, password, userName);

    //validation
    if (!email || !password || !userName) {
      return res.status(400).send({ message: "All fields are required" });
    }
    //validate email

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).send({ message: "Invalid email address" });
    }
    // Password validation
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).send({
        message:
          "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.",
      });
    }
    //checking user
    const existingUser = await userModels.findOne({ email });
    if (existingUser) {
      //existinng user
      return res.status(200).send({
        success: false,
        message: "Already Registered! Please login",
      });
    }

    //register user
    const hashedPassword = await hashPassword(password);

    const user = await new userModels({

      email,
      userName,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

//Login

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    console.log(email, password)
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //checking user
    const user = await userModels.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }
    const match = await comparePassword(password, user.password);
    //Validation
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //creating TOKEN
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      secure: process.env.NODE_ENV === 'production', // Set to true in production
      sameSite: 'Strict',
    });

    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        admin: user.isAdmin
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

//testing controller
export const testController = (req, res) => {
  try {
    res.send("Protected Routes");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};
