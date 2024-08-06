//middleware for API routes
const apiAuth = (req, res, next) => {
  if (!req.session.logged_in) {
    res.redirect("/login"); //redirect to the login page if the user is not logged in
  } else {
    console.log("User ID:", req.session.user_id); //debugging line to log the user ID
    next(); //proceed to the next middleware or route handler
  }
};

//middleware for frontend routes
const frontEndAuth = (req, res, next) => {
  if (req.session.logged_in) {
    next(); //user is logged in, proceed to next middleware
  } else {
    res.redirect("/login"); //redirect to login page if not logged in
  }
};
module.exports = { apiAuth, frontEndAuth };
