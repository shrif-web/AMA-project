const Post = require("../model.post");

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

module.exports = { get_all_posts };
