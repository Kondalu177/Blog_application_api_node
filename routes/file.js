const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/isAuthucation");
const { uploadController } = require("../controllers");
const upload = require("../middleware/upload");

router.post("/", isAuth, upload.array("image", 3), uploadController.upload);

// upload single image upload.single("image")

module.exports = router;
