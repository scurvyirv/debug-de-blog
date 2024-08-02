const router = require("express").Router();
const { Post } = require("../../models");

//import middleware to authenticate
const { apiAuth } = require("../../utils/auth");

// 'controller/api/post' endpoint

//create a new post
router.post("/", apiAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
    });
    res.status(200).json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// /api/posts/:id
router.get("/:id", apiAuth, async (req, res) => {
  try {
    const newPost = await Post.findOne({
      where: {
        id: req.params.id,
        // user_id: req.session.user_id,
      },
    });
    res.status(200).json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update a post by ID
router.put("/:id", apiAuth, async (req, res) => {
  try {
    const post = await Post.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!post[0]) {
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete a post by ID
router.delete("/:id", apiAuth, async (req, res) => {
  try {
    const post = await Post.destroy({
      where: {
        id: req.params.id,
        // user_id: req.session.user_id,
      },
    });

    if (!post) {
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
