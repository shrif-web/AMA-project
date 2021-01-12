const User = require("../model/model.user");

const get_user_by_id = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const id = req.params.id;

  if (!Number.isInteger(+id))
    return res.status(400).send({ message: "url id is not valid" });

  if (id !== req.user_id)
    return res.status(401).send({ message: "permission denied." });

  User.findOne({ user_id: id })
    .then((doc) => {
      if (doc)
        return res.status(200).send({
          user: {
            id: doc.user_id,
            email: doc.email,
            created_at: doc.created_at,
          },
        });
      return res.status(404).send({ message: "user with this id not found" });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send();
    });
}

module.exports = {get_user_by_id}