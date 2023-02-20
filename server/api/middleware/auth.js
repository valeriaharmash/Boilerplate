const { User } = require('../../db');
const { decodeToken } = require('../../utils');

// middleware
const requireToken = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const { id } = decodeToken(authorization);
    const user = await User.findByPk(id);
    if (user) {
      req.user = user;
      next();
      return;
    }
    res.sendStatus(401);
    return;
  } catch (error) {
    next(error);
  }
};

module.exports = { requireToken };
