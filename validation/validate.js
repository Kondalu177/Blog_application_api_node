const { validationResult } = require("express-validator");

const validate = (req, res, next) => {
  const errors = validationResult(req);
  const Mappederror = {};

  if (Object.keys(errors.errors).length === 0) {
    next();
  } else {
    errors.errors.map((error) => {
      Mappederror[error.path] = error.msg;
    });
    res.status(400).json(Mappederror);
  }
};

module.exports = validate;
