const extract_user_id = (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const authorization = req.headers.authorization;
  const token = authorization && authorization.split(" ")[1];
  if (!token) {
    return res.status(401).send({ message: "token neded" });
  }
  jwt.verify(token, "secret", (err, user_id) => {
    if (err) {
      return res.status(403).send();
    }
    req.user_id = user_id.user_id;
    next();
  });
};

module.exports = { extract_user_id };
