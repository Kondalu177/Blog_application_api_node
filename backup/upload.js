const multer = require("multer");
const path = require("path");
const generatecode = require("../utils/generatecode");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./upload");
  },
  filename: (req, file, callback) => {
    //orignal_file_name 12 digit random number
    const orignalName = file.originalname;
    console.log(orignalName);
    const extension = path.extname(orignalName);
    const fileName = orignalName.replace(extension, "");
    const compressedFileName = fileName.split(" ").join("_");
    const lowercasefileName = compressedFileName.toLocaleLowerCase();
    const code = generatecode(12);
    const finalfile = `${lowercasefileName}_${code}${extension}`;
    callback(null, finalfile);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, callback) => {
    const mimetype = file.mimetype;
    if (
      mimetype === "image/jpg" ||
      mimetype === "image/jpeg" ||
      mimetype === "image/png" ||
      mimetype === "application/pdf"
    ) {
      callback(null, true);
    } else {
      callback(new Error("Only .jpg, .jpeg, .png and .pdf allowed"));
    }
  },
});

module.exports = upload;
