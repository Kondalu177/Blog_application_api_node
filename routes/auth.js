const express = require("express");
const router = express.Router();
const { authController } = require("../controllers");
const {
  singupValadator,
  signinValadator,
  verificationcode,
  verifyuser,
  changePassword,
  password_validator,
  updateuser_profile,
} = require("../validation/auth");
const validate = require("../validation/validate");
const isAuthucation = require("../middleware/isAuthucation");
console.log(isAuthucation);

router.post("/signup", singupValadator, validate, authController.signup);
router.post("/signin", signinValadator, validate, authController.singin);
router.post(
  "/verication-code",
  verificationcode,
  validate,
  authController.verification_code
);
router.post("/verifu_user", verifyuser, validate, authController.verifyuser);
router.post(
  "/forgetPassword",
  verificationcode,
  validate,
  authController.forgetpassword_con
);
router.post(
  "/recover_password",
  changePassword,
  validate,
  authController.recoverPassword
);

router.put(
  "/change_password",
  isAuthucation,
  password_validator,
  validate,
  authController.password_change
);

router.put(
  "/updateuser_profile",
  isAuthucation,
  updateuser_profile,
  validate,
  authController.update_user_profile
);

// current user api
router.get("/current-user", isAuthucation, authController.currentUser);
module.exports = router;
