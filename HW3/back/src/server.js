const mongoose = require("mongoose");
const express = require("express");
const app = express();
const router = require("./routers/router");

var cors = require('cors')
const port = 4000;

var uri = "mongodb://localhost:27017/details";
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/", router);

app.use(cors());

app.listen(port, function () {
  console.log("Server is running on Port: " + port);
});
