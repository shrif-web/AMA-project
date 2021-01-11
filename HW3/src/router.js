const { query } = require("express");
const express = require("express");
const router = express.Router();
const employees = require("./model");
const Post = require("./model.post");

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

    // const date = new Date().toJSON().slice(0,10).replace(/-/g,'/');
    const date = new Date().toString();
    const post = new Post({ title: title, content: content, created_at: date });
    post
      .save()
      .then((data) => {
        return res.status(201).send({ id: data._id });
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
    Post.find({ id: id })
      .then((doc) => {
        if (doc.length === 0)
          return res
            .status(404)
            .send({ message: "post with this id not found" });
        else return res.status(200).send(doc[0]);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).send();
      });
  })
  .delete((req, res) => {
    Post.findOneAndRemove({}).then((docs) => {
      console.log(docs);
      res.send();
    });
  });

module.exports = router;
