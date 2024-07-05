const jwt = require("jsonwebtoken");
const { jwtsecretkey } = require("../config/keys");

const generateToken = (emailcomp) => {
  const token = jwt.sign(
    {
      _id: emailcomp.id,
      name: emailcomp.name,
      email: emailcomp.email,
      role: emailcomp.role,
    },
    jwtsecretkey,
    {
      expiresIn: "2d",
    }
  );
  return token;
};

module.exports = generateToken;
