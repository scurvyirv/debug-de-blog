const router = require('express').Router();
const { Comment } = require('../../models');

//middleware function to authenticate user before proceeding
const withAuth = require('../../utils/auth');

//get all comments and sends back data as JSON response
router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll();
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
    });

//create a new comment with middleware function for authentication
router.post('/', withAuth, async (req, res) => {
        try {
        const newComment = await Comment.create({
        ...req.body,
        user_id: req.session.user_id,
        });
        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

//delete a comment by ID
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.findOne({
        where: {
            id: req.params.id,
            user_id: req.session.user_id,
        },
    });

    if (!commentData) {
        res.status(404).json({ message: 'No comment found with this id!' });
        return;
    }

    await Comment.destroy({
        where: {
            id: req.params.id,
            user_id: req.session.user_id,
        },
    });

    res.status(200).json({ message: 'Comment deleted!' });
    } catch (err) {
    res.status(500).json(err);
    }
});

module.exports = router;