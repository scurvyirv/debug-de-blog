const router = require('express').Router();

// Test route to verify connection
router.get('/test', (req, res) => {
    res.send('API is working!');
  });

//insert routes here once determined

//export to server
module.exports = router;