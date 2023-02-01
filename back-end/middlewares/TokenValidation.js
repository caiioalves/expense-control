const { verify } = require('jsonwebtoken');
const dotenv = require('dotenv');

const validateToken = (req, res, next) => {

  try {
    const token = req.header("token");
    const validToken = verify(token, process.env.SECRET);
    req.user = validToken;
    if (validToken) {
      return next();
    }
  } catch (erro) {
    res.status(201).json('Token invalido');
  } 
}

module.exports = validateToken;