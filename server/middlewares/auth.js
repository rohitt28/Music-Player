const jwt = require('jsonwebtoken');

const adminOnly = async (req, res, next) => {
  const token = req.cookies.jwt_token;
  console.log(token);
  if (!token) {
    return res.status(401).json({message: 'No token provided.'});
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    console.log('decoded', decoded, Date.now());
    if (err) {
      return res.status(401).json({message: 'Invalid token.'});
    }
    if (!decoded.id.isAdmin) {
      return res.status(403).json({message: 'Admin access required.'});
    }
    req.user = decoded;
    next();
  });
};

const userOnly = async (req, res, next) => {
  const token = req.cookies.jwt_token;
  console.log(token);
  if (!token) {
    return res.status(401).json({message: 'No token provided.'});
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    console.log('decoded', decoded, Date.now());
    if (err) {
      return res.status(401).json({message: 'Invalid token.'});
    }
    req.user = decoded;
    next();
  });
};

module.exports = {adminOnly, userOnly};
