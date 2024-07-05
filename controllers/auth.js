const { User, File } = require("../models");
const hashpassword = require("../utils/hashpassword");
const comparePassword = require("../utils/comparepass");
const generateToken = require("../utils/generatetoken");
const generatecode = require("../utils/generatecode");
const sendmail = require("../utils/sendemail");

const signup = async (req, res, next) => {
  try {
    //  res.code = 400;
    // throw error("test error")
    const { name, email, password, role } = req.body;

    // Form validation

    emailExits = await User.findOne({ email });
    if (emailExits) {
      res.code = 400;
      throw new Error("Email already Exited");
    }

    const hashedPassword = await hashpassword(password);

    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();
    res.status(201).json({
      code: 201,
      status: true,
      message: "User registered Successfully",
    });
  } catch (error) {
    next(error);
  }
};

// signin field

const singin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const emailcomp = await User.findOne({ email });

    if (!emailcomp) {
      res.code = 401;
      throw new Error(" Invalid Credentials");
    }
    const match = await comparePassword(password, emailcomp.password);
    if (!match) {
      res.code = 200;
      throw new Error("Invalid Credentaials");
    }

    const token = generateToken(emailcomp);
    res.status(200).json({
      code: 200,
      status: true,
      message: "User Login Successfully",
      data: { token },
    });
  } catch (error) {
    next(error);
  }
};

const verification_code = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.code = 404;
      throw new Error(`User not found`);
    }
    // user.isverified = true; user.isverified are same
    if (user.isverified) {
      res.code = 400;
      throw new Error("User Already verified");
    }
    const code = generatecode(6);
    user.varificationcode = code;
    await user.save();

    //email send
    await sendmail({
      emailTo: user.email,
      subject: " Email verification code",
      code,
      content: "verify your account",
    });

    res.status(200).json({
      code: 200,
      status: true,
      message: "User verifcation code sent successfully.",
    });
  } catch (error) {
    next(error);
  }
};

const verifyuser = async (req, res, next) => {
  try {
    const { email, code } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      res.code = 404;
      throw new Error("user not found");
    }

    if (user.varificationcode !== code) {
      res.code = 400;
      throw new Error("Invaild verification code");
    }
    user.isverified = true;
    user.varificationcode = null;
    await user.save();

    res
      .status(200)
      .json({ code: 200, status: true, message: "verification is successful" });
  } catch (error) {
    next(error);
  }
};

// Forgot password confirmation message

const forgetpassword_con = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      res.code = 404;
      throw new Error("USer not Found");
    }
    const code = generatecode(6);

    user.forget_password = code;
    await user.save();

    await sendmail({
      emailTo: user.email,
      subject: "Forget password",
      code,
      content: "reset password",
    });
    res.status(200).json({
      code: 200,
      status: true,
      message: "forgot password send successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Recover Password

const recoverPassword = async (req, res, next) => {
  try {
    const { email, code, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.code = 404;
      throw new Error("User Not Found");
    }
    if (user.forget_password !== code) {
      res.code = 400;
      throw new Error("Invailed Code");
    }
    const hashPassword = await hashpassword(password);
    user.password = hashPassword;
    user.forget_password = null;
    await user.save();
    res.status(200).json({
      code: 200,
      status: true,
      message: "successfully Recover the Password",
    });
  } catch (error) {
    next(error);
  }
};

// Change the password

const password_change = async (req, res, next) => {
  try {
    const { oldpassword, newpassword } = req.body;
    const { _id } = req.user;
    const user = await User.findOne({ _id });
    if (!user) {
      res.code = 404;
      throw new Error(`User not Found`);
    }
    const match = await comparePassword(oldpassword, user.password);
    if (!match) {
      res.code = 400;
      throw new Error(`Old Passwrod Not Matched`);
    }
    if (oldpassword === newpassword) {
      res.code = 400;
      throw new Error(`Your providing Old Password `);
    }
    const hashedpassword = await hashpassword(newpassword);
    user.password = hashedpassword;
    await user.save();
    res.status(200).json({
      code: 200,
      status: true,
      message: "Passwrod change Successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Update user Profile

const update_user_profile = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { name, email, profile_pic } = req.body;

    const user = await User.findOne({ _id }).select(
      "-password -varificationcode -forget_password -__v "
    );
    if (!user) {
      res.code = 404;
      throw new Error("User not Found");
    }
    if (profile_pic) {
      const file = await File.fineById({ profile_pic });
      if (!file) {
        res.code = 404;
        throw new Error("File not Found");
      }
    }
    user.name = name ? name : user.name;
    user.email = email ? email : user.email;
    user.profile_pic = profile_pic;
    if (email) {
      const isUserExist = await User.findOne({ email });
      if (
        isUserExist &&
        isUserExist.email === email &&
        String(User._id) !== String(isUserExist._id)
      ) {
        res.code = 400;
        throw new Error("Email Already Exist");
      }
    }

    await user.save();
    res.status(200).json({
      code: 200,
      status: true,
      message: "User Updated Profile Successfully",
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

// current user profile
const currentUser = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const user = await User.findById(_id).select(
      "-password -varificationcode -forget_password"
    );
    if (!user) {
      res.code = 404;
      throw new Error("User not Found");
    }
    res.status(200).json({
      code: 200,
      status: true,
      message: "Get Current user Successfully",
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  singin,
  verification_code,
  verifyuser,
  forgetpassword_con,
  recoverPassword,
  password_change,
  update_user_profile,
  currentUser,
};
