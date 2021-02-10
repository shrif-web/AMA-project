const onlyPost = (req, res) => {
  res.status(405).send({ message: "Only `Post` Method is Valid" });
};

const fourOfour = (req, res) => {
  res.status(404).send();
};

module.exports = { onlyPost, fourOfour };
