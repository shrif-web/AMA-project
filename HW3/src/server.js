const mongoose = require("mongoose");
const express = require("express");
const app = express();
const router = require("./routers/router");
const router_signin = require("./routers/router.sign");
const router_user = require("./routers/router.user");

var cors = require('cors')
const port = 4000;

var uri = "mongodb://localhost:9876/details";
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/", router_signin);
app.use("/api/admin/user", router_user);
app.use("/api/", router);

app.use(cors());

app.listen(port, function () {
  console.log("Server is running on Port: " + port);
});
