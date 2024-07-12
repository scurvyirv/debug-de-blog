const router = require('express').Router();

//test route to verify connection
router.get('/test', (req, res) => {
    res.send('API is working!');
});

//define routes
const postRoutes = require('./postRoutes');
const userRoutes = require('./userRoutes');
const commentRoutes = require('./commentRoutes');

//use routes
router.use('/posts', postRoutes);
router.use('/users', userRoutes);
router.use('/comments', commentRoutes);

//export to server
module.exports = router;