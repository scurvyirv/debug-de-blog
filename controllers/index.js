const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes')
const dashboardRoutes = require('./dashboardRoutes')

//use API routes
router.use('/api', apiRoutes);
router.use('/', homeRoutes)
router.use('/dashboard', dashboardRoutes)

//test route to verify connection
router.get('/test', (req, res) => {
  res.send('API is working!');
});

//export router to be used in server.js
module.exports = router;