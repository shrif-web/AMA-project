const express = require("express");
const router = express.Router();
const { fourOfour, onlyPost } = require("../util/utils");
const { extract_user_id } = require("../util/utils.auth");
const { signin, signup } = require("../controller/controller.sign");
const { get_user_by_id } = require("../controller/controller.user");
const {
  get_all_posts,
  get_all_post_by_user_id,
  create_post,
  get_post_by_id,
  delete_post,
  update_post,
} = require("../controller/controller.post");

router
  .route("/admin/post/crud")
  .get(extract_user_id, get_all_post_by_user_id)
  .post(extract_user_id, create_post)
  .all(fourOfour);

router
  .route("/admin/post/crud/:id")
  .get(get_post_by_id)
  .delete(extract_user_id, delete_post)
  .put(extract_user_id, update_post)
  .all(fourOfour);

router
  .route("/admin/user/crud/:id")
  .get(extract_user_id, get_user_by_id)
  .all(fourOfour);

router.route("/post").get(get_all_posts).all(fourOfour);

router.route("/signin").post(signin).all(onlyPost);
router.route("/signup").post(signup).all(onlyPost);

router.route("*").all(fourOfour);

module.exports = router;
