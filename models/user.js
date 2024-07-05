const mongoose = require("mongoose");

//create user schema

const UserSchema = mongoose.Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true, trim: true },
    password: { type: String, require: true, minlength: 6 },
    // role : 1 -> super admin, role :2-> admin, role :3 -> User
    role: { type: Number, default: 3 },
    varificationcode: String,
    forget_password: String,
    isverified: { type: Boolean, default: false },
    profile_pic: { type: mongoose.Types.ObjectId, ref: "file" },
  },
  { timestamps: true }
);

const User = mongoose.model("users", UserSchema);

module.exports = User;
