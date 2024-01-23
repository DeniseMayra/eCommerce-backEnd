import path from 'path';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { fileURLToPath } from 'url';
import { config } from './config/config.js';
import multer from 'multer';

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
    _id: user._id,
    role: user.role,
    last_connection: user.last_connection
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


// --------------- MULTER ---------------
const checkIsValiduser = (user) => {
  const {first_name, email, password } = user;
  if ( !first_name || !email || !password ){
    return false;
  }
  return true;
}

const profileFilter = (req, file, cb) => {
  if (!checkIsValiduser(req.body)){
    cb(null, false);
  } else {
    cb(null, true);
  }
}

const profileStorage = multer.diskStorage({
  destination: function(req, file, cb){
    cb (null, path.join(__dirname, '/multer/users/img'));
  },
  filename: function (req, file, cb){
    cb(null, `${req.body.email}-profile-${file.originalname}`);
  }
});
const uploaderProfileImage = multer({storage: profileStorage, fileFilter: profileFilter});

const profileDocumentsStorage = multer.diskStorage({
  destination: function(req, file, cb){
    cb (null, path.join(__dirname, '/multer/users/documents'));
  },
  filename: function (req, file, cb){
    cb(null, `${req.body.email}-document-${file.originalname}`);
  }
});
const uploaderProfileDocument = multer({storage: profileDocumentsStorage, fileFilter: profileFilter});

const productStorage = multer.diskStorage({
  destination: function(req, file, cb){
    cb (null, path.join(__dirname, '/multer/products/img'));
  },
  filename: function (req, file, cb){
    cb(null, `${req.body.code}-product-${file.originalname}`);
  }
});
const uploaderProductImage = multer({storage: productStorage, fileFilter: profileFilter});

export { uploaderProductImage, uploaderProfileDocument, uploaderProfileImage };
