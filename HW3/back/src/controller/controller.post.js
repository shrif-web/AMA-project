const Post = require("../model/model.post");

const delete_post = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const id = req.params.id;
  if (!Number.isInteger(+id))
    return res.status(400).send({ message: "url id is not valid" });

  Post.findOne({ id: id })
    .then((doc) => {
      if (!doc)
        return res.status(404).send({ message: "post with this id not found" });
      if (doc.created_by !== req.user_id)
        return res.status(401).send({ message: "permission denied." });
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
};

const create_post = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const { title, content } = req.body;
  if (Object.keys(req.body).length !== 2)
    return res.status(400).send({ message: "Request Length should be 2" });
  if (title === undefined || title === "")
    return res.status(400).send({ message: "filed `title` is not valid" });
  if (content === undefined || content === "")
    return res.status(400).send({ message: "filed `content` is not valid" });

  const post = new Post({
    title: title,
    content: content,
    created_by: `${req.user_id}`,
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
};

const update_post = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const { title, content } = req.body;
  if (Object.keys(req.body).length !== 2)
    return res.status(400).send({ message: "Request Length should be 2" });
  if (title === undefined || title === "")
    return res.status(400).send({ message: "filed `title` is not valid" });
  if (content === undefined || content === "")
    return res.status(400).send({ message: "filed `content` is not valid" });

  const id = req.params.id;
  if (!Number.isInteger(+id))
    return res.status(400).send({ message: "url id is not valid" });

  Post.findOne({ id: id })
    .then((doc) => {
      if (!doc)
        return res.status(404).send({ message: "post with this id not found" });
      if (doc.created_by !== req.user_id)
        return res.status(401).send({ message: "permission denied." });
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
};

const get_post_by_id = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const id = req.params.id;
  if (!Number.isInteger(+id))
    return res.status(400).send({ message: "url id is not valid" });

  Post.findOne({ id: id })
    .then((doc) => {
      if (doc)
        return res.status(200).send({
          post: {
            id: doc.id,
            title: doc.title,
            content: doc.content,
            created_by: doc.created_by,
            created_at: doc.created_at,
          },
        });
      return res.status(404).send({ message: "post with this id not found" });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send();
    });
};

const get_all_post_by_user_id = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  Post.find({ created_by: req.user_id })
    .then((doc) => {
      return res.status(200).send({
        posts: doc.map((doc) => {
          return {
            id: doc.id,
            title: doc.title,
            content: doc.content,
            created_by: doc.created_by,
            created_at: doc.created_at,
          };
        }),
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send();
    });
};

const get_all_posts = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  Post.find()
    .then((docs) => {
      return res.status(200).send({
        posts: docs.map((doc) => {
          return {
            id: doc.id,
            title: doc.title,
            content: doc.content,
            created_by: doc.created_by,
            created_at: doc.created_at,
          };
        }),
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send();
    });
};

module.exports = {
  get_all_posts,
  get_all_post_by_user_id,
  create_post,
  get_post_by_id,
  delete_post,
  update_post,
};
