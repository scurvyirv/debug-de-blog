const router = require('express').Router();

//test route to verify connection
router.get('/test', (req, res) => {
    res.send('API is working!');
});

//define routes
const postRoutes = require('../api/postRoutes');
const userRoutes = require('../api/userRoutes');
const commentRoutes = require('../api/commentRoutes');

//use routes
router.use('/posts', postRoutes);
router.use('/users', userRoutes);
router.use('/comments', commentRoutes);

//export to server
module.exports = router;