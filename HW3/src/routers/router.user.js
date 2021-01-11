const { query } = require("express");
const express = require("express");
const router = express.Router();
const User = require("../model.user");
var jwt = require("jsonwebtoken");

router
  .route("/crud/")
  .get((req, res) => {
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
    User.findOneAndRemove({})
      .then((docs) => {
        if (docs) return res.status(200).send({ message: "removed" });
        return res.status(200).send({ message: "not exist" });
      })
      .catch((err) => {
        reject(err);
      });
  });

router.route("/crud/:id").get((req, res) => {
  const id = req.params.id;
  if (id === undefined || id === "" || !Number.isInteger(+id))
    return res.status(400).send({ message: "url id is not valid" });
  User.findOne({ user_id: id })
    .then((doc) => {
      if (doc) return res.status(200).send(doc);
      return res.status(404).send({ message: "post with this id not found" });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send();
    });
});

module.exports = router;
