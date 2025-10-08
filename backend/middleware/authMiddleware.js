const jwt = require('jsonwebtoken');

// Middleware to decode JWT from Authorization header and attach user to req
function decodeToken(req, res, next) {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // contains at least { id, role }
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

function protect(allowedRoles = []) {
  return (req, res, next) => {
    const user = req.user; // assumes JWT middleware sets this
    if (!user || !allowedRoles.includes(user.role)) {
      return res.status(403).json({ error: 'Access denied' });
    }
    next();
  };
}

module.exports = { decodeToken, protect };
