const jwt = require('jsonwebtoken');

exports.isAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

exports.isRole = role => (req, res, next) => {
  if (req.user.role !== role)
    return res.status(403).json({ message: 'Forbidden' });
  next();
};
