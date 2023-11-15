import path from 'path';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { fileURLToPath } from 'url';
import { config } from './config/config.js';

export const __dirname = path.dirname(fileURLToPath(import.meta.url));


// --------------- PASSWORD HASH ---------------
export const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync());
};

export const isValidPassword = (password, user) => {
  return bcrypt.compareSync(password, user.password);
};

// --------------- JSON WEB TOKEN ---------------
export const generateToken = (user) => {
  const userData = {
    first_name: user.first_name,
    email: user.email,
    cartId: user.cartId,
    role: user.role
  };
  const token = jwt.sign(userData, config.token.secretToken, {expiresIn:'24h'});
  return token;
};

export const validateToken = (req, res, next) => {
  // usualmente se usan los headers: Authorization=Bearer <token>
  const authHeader = req.headers['authorization'];
  if ( !authHeader ) return res.sendStatus(401);

  const token = authHeader.split(' ')[1];

  if ( token === null ) return sendStatus(401);

  jwt.verify( token, config.token.secretToken, (err, payload) => {
    if ( err ) return res.sendStatus(403);
    req.user = payload; // info encriptada dentro del token
    next();
  });
};
