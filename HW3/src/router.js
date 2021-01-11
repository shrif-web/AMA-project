const { query } = require("express");
const express = require("express");
const router = express.Router();
const Post = require("./model.post");
const User = require("./model.user");

router
  .route("/admin/post/crud")
  .get((req, res) => {
    Post.find({})
      .then((doc) => {
        return res.status(200).send({ posts: doc });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).send();
      });
  })
  .post((req, res) => {
    const { title, content } = req.body;
    if (Object.keys(req.body).length !== 2)
      return res.status(400).send({ message: "Request Length should be 2" });
    if (title === undefined || title === "")
      return res.status(400).send({ message: "filed `title` is not valid" });
    if (content === undefined || content === "")
      return res.status(400).send({ message: "filed `content` is not valid" });

    //TODO get user_id from token
    const user_id = "0";
    const post = new Post({
      title: title,
      content: content,
      created_by: user_id,
    });
    post
      .save()
      .then((data) => {
        return res.status(201).send({ id: data.id });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).send();
      });
  });

router
  .route("/admin/post/crud/:id")
  .get((req, res) => {
    const id = req.params.id;
    if (id === undefined || id === "" || !Number.isInteger(+id))
      return res.status(400).send({ message: "url id is not valid" });
    Post.findOne({ id: id })
      .then((doc) => {
        if (doc) return res.status(200).send(doc);
        return res.status(404).send({ message: "post with this id not found" });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).send();
      });
  })
  .delete((req, res) => {
    const id = req.params.id;
    if (id === undefined || id === "" || !Number.isInteger(+id))
      return res.status(400).send({ message: "url id is not valid" });
    Post.findOne({ id: id })
      .then((doc) => {
        if (!doc)
          return res
            .status(404)
            .send({ message: "post with this id not found" });
        doc
          .delete()
          .then(() => {
            return res.status(204).send();
          })
          .catch((err) => {
            console.log(err);
            res.status(500).send();
          });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).send();
      });
  })
  .put((req, res) => {
    const { title, content } = req.body;
    if (Object.keys(req.body).length !== 2)
      return res.status(400).send({ message: "Request Length should be 2" });
    if (title === undefined || title === "")
      return res.status(400).send({ message: "filed `title` is not valid" });
    if (content === undefined || content === "")
      return res.status(400).send({ message: "filed `content` is not valid" });
    const id = req.params.id;
    if (id === undefined || id === "" || !Number.isInteger(+id))
      return res.status(400).send({ message: "url id is not valid" });
    Post.findOne({ id: id })
      .then((doc) => {
        if (!doc)
          return res
            .status(404)
            .send({ message: "post with this id not found" });
        doc.title = title;
        doc.content = content;
        doc
          .save()
          .then((doc) => res.status(204).send())
          .catch((err) => {
            console.log(err);
            res.status(500).send();
          });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).send();
      });
  });

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
router.route("/signup").post(async(req, res) => {
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
  if (user_same_email){
      return res.status(409).send({  "message": "email already exist."});
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

router.route("/admin/user/crud/").get((req, res) => {
  User.find({})
    .then((doc) => {
      return res.status(200).send({ users: doc });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send();
    });
});

router.route("/admin/user/crud/:id").get((req, res) => {
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
