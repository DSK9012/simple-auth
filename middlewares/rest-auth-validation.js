const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // get token from header
  const token = req.header('auth-token');

  // check token existence
  try {
    if (!token) {
      return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // verify token
    const decodedToken = jwt.verify(token, 'myjwtsecret');
    req.user = decodedToken.user;

    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
