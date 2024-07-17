//front end routes that do NOT require back-end authentication

//front-end related routes 
const router = require('express').Router();

//import Post model and User model
const { Post, User } = require('../models');

//import middleware/auth
const { frontEndAuth } = require('../utils/auth');

//renders homepage
router.get('/', async (req, res) => {
    try {
        //database interaction
        const postData = await Post.findAll()

        //serialize data so handlebars can use it as 'plain' data
        const serializedPostData = postData.map( (post) => {
            return post.get({plain : true})
        })

        //points to homepage.handlebars 
        res.render('homepage', {posts : serializedPostData}) 
    } catch (err) {
        res.status(500).json(err);
    }
})

//renders login page
router.get('/login', async (req, res) => {
    try {
        res.render('login') 
    } catch (err) {
        res.status(500).json(err);
    }
});

//renders signup page
router.get('/signup', async (req, res) => {
    try {
        res.render('signup') 
    } catch (err) {
        res.status(500).json(err);
    }
});

//render dashboard page (authentication required i.e. log in needed)
router.get('/dashboard', frontEndAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id,
            },
        });
        const posts = postData.map((post) => post.get({ plain: true }));
        res.render('dashboard', {
            posts,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;