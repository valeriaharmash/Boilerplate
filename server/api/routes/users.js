const router = require('express').Router();
const { User } = require('../../db');
const { requireToken } = require('../middleware');
const { generateToken, verifyPassword } = require('../../utils');

// signup: create new user
router.post('/signup', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.create({ username, password });
    const token = generateToken(user.id);
    res.send({ token });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

// login: verify user's credentials and generate user token
router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({
      where: {
        username,
      },
    });
    if (user && (await verifyPassword(user.password, password))) {
      const token = generateToken(user.id);
      res.send({ token });
      return;
    }
    res.sendStatus(401);
  } catch (err) {
    next(err);
  }
});

// verify user's token and respond with user data
router.get('/auth', requireToken, async (req, res, next) => {
  try {
    res.send(req.user);
  } catch (ex) {
    next(ex);
  }
});

// error handling
router.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).send({ error: err.message });
});

module.exports = router;
