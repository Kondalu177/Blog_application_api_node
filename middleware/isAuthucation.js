const jwt = require("jsonwebtoken");
const { jwtsecretkey } = require("../config/keys");

const isAuthucation = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization
      ? req.headers.authorization.split(" ")
      : [];
    const token = authorization.length > 1 ? authorization[1] : null;
    console.log(token);
    if (token) {
      const payload = jwt.verify(token, jwtsecretkey);
      console.log(payload);
      if (payload) {
        req.user = {
          _id: payload._id,
          name: payload.name,
          email: payload.email,
          role: payload.role,
        };
        next();
      } else {
        res.code = 401;
        throw new Error("Unauthorized to Login");
      }
    } else {
      res.code = 400;
      throw new Error("Token is Required");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = isAuthucation;
