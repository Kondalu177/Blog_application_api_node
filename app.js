const express = require("express");
const bodyparser = require("body-parser");
const dotenv = require("dotenv");
const morgan = require("morgan");
dotenv.config();
const connectMongodb = require("./init/mongoose");
const { authRotue, category, fileRoute, postRoute } = require("./routes");
const { errorhandler } = require("./middleware");
const notfound = require("./controllers/notfound");

//init app

const app = express();

// connect MongoDB
connectMongodb();

//Thired party middlewares
app.use(express.json({ limit: "500mb" }));
app.use(bodyparser.urlencoded({ limit: "500mb", extended: true }));

app.use(morgan("dev"));

// Rotues section
app.use("/api/v1/auth", authRotue);
app.use("/api/v1/category", category);
app.use("/api/v1/upload", fileRoute);
app.use("/api/v1/post", postRoute);

// Rotue is not found
app.use("*", notfound);

// Error handling middlewware
app.use(errorhandler);

module.exports = app;
