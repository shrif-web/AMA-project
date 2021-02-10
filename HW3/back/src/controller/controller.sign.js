const User = require("../model/model.user");
var jwt = require("jsonwebtoken");

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

const signup = async (req, res) => {
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
};

const signin = async (req, res) => {
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
  if (!user_same_email)
    return res.status(401).send({ message: "wrong email or password." });

  if (user_same_email.password !== password)
    return res.status(401).send({ message: "wrong email or password." });

  const token = jwt.sign(
    {
      user_id: `${user_same_email.user_id}`,
    },
    "secret",
    { expiresIn: "1h" }
  );
  res.send({ token: `Bearer ${token}` });
};

module.exports = { signup, signin };
