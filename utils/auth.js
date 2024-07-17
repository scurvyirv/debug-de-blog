//middleware for API routes
const apiAuth = (req, res, next) => {
    if (req.session.logged_in) {
      return next();
    } else {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  };

  //middleware for frontend routes
  const frontEndAuth = (req, res, next) => {
        if (req.session.logged_in) {
            next(); //user is logged in, proceed to next middleware
        } else {
            res.redirect('/login'); //redirect to login page if not logged in
        }
    };
  module.exports = { apiAuth, frontEndAuth };