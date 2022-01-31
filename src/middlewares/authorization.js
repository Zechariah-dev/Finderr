const crypto = require('crypto');
const { verifyToken } = require('../utils/jwt');

exports.isAuth = (req, res, next) => {
  let token = req.headers['authorization'];

  if (!token)
    return res.status(403).json({ message: 'A token is required for authentication' });

  if (!token.startsWith('Bearer '))
    return res.status(400).json({ message: 'Invalid token format, it should start with ' / Bearer / '' })

  try {
    token = token.split(' ')[1];
    const decoded = verifyToken(token);
    req.user = decoded;
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
  next();
}

const getToken = (user) => {
  const { email, _id } = user;
  return jwt.sign({ email, _id }, process.env.JWT_TOKEN_KEY, { expiresIn: '2h' })
}

exports.getToken = getToken;

const generateHash = (payload) => {
  return crypto.createHmac('sha256', process.env.JWT_TOKEN_KEY).update(payload).digest('hex');
}

exports.generateHash = generateHash;