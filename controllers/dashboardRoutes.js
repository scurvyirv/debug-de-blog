//front end routes requiring authentication

//import router and authentication file
const router = require('express').Router();
const { Post } = require('../models');
const { apiAuth } = require('../utils/auth');

//render dashboard
router.get('/dashboard', apiAuth, async (req, res) => {
    try {
        // Fetch posts by logged-in user
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id,
            },
        });

        //serialize data for handlebars
        const serializedPostData = postData.map((post) => post.get({ plain: true }));

        //render dashboard.handlebars with posts data
        res.render('dashboard', { posts: serializedPostData, logged_in: req.session.logged_in });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;