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
    const post = new Post({ title: title, content: content , created_by: user_id});
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

router.route("/signup").post((req, res) => {
  const { email, password } = req.body;
  if (Object.keys(req.body).length !== 2)
    return res.status(400).send({ message: "Request Length should be 2" });
  if (email === undefined || email === "")
    return res.status(400).send({ message: "filed `email` is not valid" });
  if (password === undefined || password === "")
    return res.status(400).send({ message: "filed `password` is not valid" });

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
