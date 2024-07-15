//middeware function that checks if user logged in before proceeding with request
module.exports = function(req, res, next) {
    if (req.session && req.session.logged_in) {
      return next();
    } else {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  };