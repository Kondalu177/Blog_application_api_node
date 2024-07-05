const { check } = require("express-validator");
const emailvalidate = require("./validateemail");
const { default: mongoose } = require("mongoose");

const singupValadator = [
  check("name").notEmpty().withMessage("Name is required"),
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid Email ID"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password should be between 6 to 15 char long")
    .notEmpty()
    .withMessage("Password is required"),
];

const signinValadator = [
  check("email")
    .isEmail()
    .withMessage("Invaild Email ID")
    .notEmpty()
    .withMessage("Email is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("password Password should be between 6 to 15 char long")
    .notEmpty()
    .withMessage("Password is Required"),
];

const verificationcode = [
  check("email")
    .isEmail()
    .withMessage("Invaild Email ID")
    .notEmpty()
    .withMessage("Email is required"),
];

const verifyuser = [
  check("email")
    .isEmail()
    .withMessage("Invaild Email ID")
    .notEmpty()
    .withMessage("Email is required"),
  check("code").notEmpty().withMessage("OTP is required"),
];
const changePassword = [
  check("email")
    .isEmail()
    .withMessage("Invaild Email ID")
    .notEmpty()
    .withMessage("Email is required"),
  check("code").notEmpty().withMessage("OTP is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password should be between 6 to 15 char long")
    .notEmpty()
    .withMessage("Password is required"),
];
const password_validator = [
  check("oldpassword").notEmpty().withMessage("Old password is Required"),
  check("newpassword").notEmpty().withMessage("New password is Required"),
];

const updateuser_profile = [
  check("email").custom(async (email) => {
    if (email) {
      const isvalidEmail = emailvalidate(email);
      if (!isvalidEmail) {
        throw "Invalid Email format";
      }
    }
  }),
  check("profile_pic").custom(async (profile_pic) => {
    if (profile_pic && !mongoose.Types.ObjectId.isValid(profile_pic)) {
      throw "Invalid profile picture ";
    }
  }),
];

module.exports = {
  singupValadator,
  signinValadator,
  verificationcode,
  verifyuser,
  changePassword,
  password_validator,
  updateuser_profile,
};
