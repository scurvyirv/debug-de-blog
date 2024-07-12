const router = require('express').Router();
const apiRoutes = require('./api');

//use API routes
router.use('/api', apiRoutes);

//test route to verify connection
router.get('/test', (req, res) => {
  res.send('API is working!');
});

//export router to be used in server.js
module.exports = router;