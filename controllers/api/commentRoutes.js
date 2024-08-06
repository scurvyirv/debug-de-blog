const router = require("express").Router();
const { Comment, User } = require("../../models");

//middleware function to authenticate user before proceeding
const { apiAuth } = require("../../utils/auth");

//get all comments for a specific post
router.get("/", apiAuth, async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: {
        post_id: req.query.post_id,
      },
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
});

//create new comment to specific post ID
router.post("/", apiAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newComment);
  } catch (err) {
    console.log("error", err);
    res.status(500).json(err);
  }
});

//delete comments that match user ID (prevents deleting ANY comment)
router.delete("/:id", apiAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: "No comment found with this id!" });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
module.exports = router;
