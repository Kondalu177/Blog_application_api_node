const upload = async (req, res, next) => {
  try {
    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
};

module.exports = { upload };
