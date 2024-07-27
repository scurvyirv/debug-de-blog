const router = require('express').Router();
const { User } = require('../../models');
// const { apiAuth } = require('../../utils/auth');

// '/api/users' endpoint

//create new user signup
router.post('/signup', async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.logged_in = true;
      res.status(200).json(newUser);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//user login
router.post('/login', async (req, res) => {
    console.log('login route hit') //checks if route is hit
  try {
    const user = await User.findOne({
      where: { username: req.body.username },
    });
console.log('user', user);
    if (!user) {
    res.status(400).json({ message: 'No user with that username!' });
      return;
    }

    const validPassword = user.checkPassword(req.body.password);
console.log('valid password', validPassword);
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password!' });
      return;
    }
    //save session and respond
    req.session.save(() => {
        req.session.user_id = user.id;
        req.session.logged_in = true;
        res.json({ user, message: 'You are now logged in!' });
    });
} catch (err) {
    res.status(500).json(err);
}
});

//user logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;