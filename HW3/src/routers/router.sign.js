const { query } = require("express");
const express = require("express");
const router = express.Router();
const Post = require("../model.post");
const User = require("../model.user");
var jwt = require("jsonwebtoken");

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
router.route("/signin").post(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const { email, password } = req.body;
  if (Object.keys(req.body).length !== 2)
    return res.status(400).send({ message: "Request Length should be 2" });
  if (email === undefined || !validateEmail(email))
    return res.status(400).send({ message: "filed `email` is not valid" });
  if (password === undefined || password.length <= 5)
    return res
      .status(400)
      .send({ message: "filed `password`.length should be gt 5" });

  const user_same_email = await User.findOne({ email: email });
  console.log(user_same_email);
  if (!user_same_email) {
    return res.status(409).send({ message: "email already exist." });
  }

  const token = jwt.sign(
    {
      id: user_same_email.user_id,
    },
    "secret",
    { expiresIn: "1h" }
  );
  console.log(token);
  res.send({ token: token });
});

router.route("/signup").post(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  console.log('signup')
  const { email, password } = req.body;
  if (Object.keys(req.body).length !== 2)
    return res.status(400).send({ message: "Request Length should be 2" });
  if (email === undefined || !validateEmail(email))
    return res.status(400).send({ message: "filed `email` is not valid" });
  if (password === undefined || password.length <= 5)
    return res
      .status(400)
      .send({ message: "filed `password`.length should be gt 5" });

  const user_same_email = await User.findOne({ email: email });
  if (user_same_email) {
    return res.status(409).send({ message: "email already exist." });
  }

  const user = new User({ email: email, password: password });
  user
    .save()
    .then((data) => {
      return res.status(201).send({ message: "user has been created." });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send();
    });
});

router.route("/check").get((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const token = req.body.token || "ali";
  jwt.verify(token, "secret", (err, id) => {
    if (err) res.status(399).send();
    res.send(id);
  });
  res.send();
});

module.exports = router;
