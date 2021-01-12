const { query } = require("express");
const express = require("express");
const router = express.Router();
const User = require("../model.user");
var jwt = require("jsonwebtoken");

router
  .route("/user")
  .get((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    User.find({})
      .then((doc) => {
        return res.status(200).send({ users: doc });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).send();
      });
  })
  .delete((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    User.findOneAndRemove({})
      .then((docs) => {
        if (docs) return res.status(200).send({ message: "removed" });
        return res.status(200).send({ message: "not exist" });
      })
      .catch((err) => {
        reject(err);
      });
  });


module.exports = router;
