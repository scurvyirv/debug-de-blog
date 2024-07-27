const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes')
const dashboardRoutes = require('./dashboardRoutes')

//use API routes
router.use('/api', apiRoutes);
router.use('/', homeRoutes)
router.use('/dashboard', dashboardRoutes)

//export router to be used in server.js
module.exports = router;