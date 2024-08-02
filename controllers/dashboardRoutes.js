//front end routes requiring authentication

//import router and authentication file
const router = require("express").Router();
const { Post, User } = require("../models");
const { apiAuth } = require("../utils/auth");

//render dashboard
router.get("/", apiAuth, async (req, res) => {
  try {
    //fetch posts by logged-in user
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    //serialize data for handlebars
    const serializedPostData = postData.map((post) =>
      post.get({ plain: true })
    );

    //render dashboard.handlebars with posts data
    res.render("dashboard", {
      posts: serializedPostData,
      logged_in: req.session.logged_in,
      user_id: req.session.user_id, // Pass the user_id to the template
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
