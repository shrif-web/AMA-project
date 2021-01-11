const { query } = require("express");
const express = require("express");
const router = express.Router();
const Post = require("../model.post");
const User = require("../model.user");
var jwt = require("jsonwebtoken");

router.use((req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send({ message: "token neded" });
  }
  jwt.verify(token, "secret", (err, user_id) => {
    if (err) {
      return res.status(403).send();
    }
    req.user_id = user_id.id;
    console.log(user_id);
    next();
  });
});

router
  .route("/admin/post/crud")
  .get((req, res) => {
    Post.find({ created_by: req.user_id })
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
    const user_id = req.user_id;
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

module.exports = router;
