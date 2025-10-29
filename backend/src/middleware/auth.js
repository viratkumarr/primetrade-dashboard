const jwt = require('jsonwebtoken');

function getTokenFromReq(req) {
  if (req.cookies && req.cookies.token) return req.cookies.token;
  const auth = req.headers.authorization || '';
  if (auth.startsWith('Bearer ')) return auth.substring(7);
  return null;
}

module.exports = function auth(req, res, next) {
  const token = getTokenFromReq(req);
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};