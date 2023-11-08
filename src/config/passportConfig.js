import passport from 'passport';
import localStrategy from 'passport-local';
import githubStrategy from 'passport-github2';
import jwt from 'passport-jwt';
import { usersModel } from '../dao/mongo/models/users.model.js';
import { createHash, isValidPassword } from '../utils.js';
import { config } from './config.js';
import { cartsService } from '../dao/mongo/services.js';

const JWTStrategy = jwt.Strategy;
const extractJWT = jwt.ExtractJwt;

// ---------- LOCAL STRATEGY ----------
// localStrategy: username y password
export const initializePassport = () => {

  passport.use('SignupLocalStrategy', new localStrategy(
    {
      passReqToCallback: true,
      usernameField: 'email'
    },
    async (req, username, password, done) => { // done(error, usuario)
      try {
        const user = await usersModel.findOne({email: username});

        if ( user ){
          return done(null, false);
        }

        const cart = await cartsService.createCart(); //object
        
        let newUser = req.body;
        newUser.email = username;
        newUser.cartId = cart._id;
        newUser.password = createHash(password);
        const userCreated = await usersModel.create(newUser);
        return done(null, userCreated);

      } catch (error) {
        return done(error);
      }
    }
  ));

  passport.use('LoginLocal', new localStrategy(
    { usernameField: 'email'},
    async ( username, password, done) => {
      try {
        const user = await usersModel.findOne({email: username});
        if ( !user ){
          return done(null, false);
        }
        if ( !isValidPassword(password, user) ){
          return done(null, false);
        }
        return done(null, user);

      } catch (error) {
        return done(error);
      }
    }
  ));


  // ---------- JWT STRATEGY ----------
  passport.use('jwtAuth', new JWTStrategy(
    {
      jwtFromRequest: extractJWT.fromExtractors([cookieExtractor]),
      secretOrKey: config.token.secretToken
    },
    async ( jwtPayload, done) => {
      try {
        return done(null, jwtPayload); // req.user con la info del token      

      } catch (error) {
        return done(error);
      }
    }
  ));


  // ---------- GITHUB STRATEGY ----------
  passport.use('SignupGithub', new githubStrategy(
    {
      clientID: config.github.clientId,
      clientSecret: config.github.clientSecret,
      callbackURL: `http://localhost:8080/api/sessions${config.github.callbackUrl}`
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await usersModel.findOne({last_name: profile.username});

        if ( user ){
          return done(null, user); // si esta registrado se loguea
        }

        const cart = await cartsService.createCart(); //object

        const newUser = {
          first_name: profile.displayName,
          last_name: profile.username,
          email: profile._json.email,
          age: null,
          password: createHash(profile.id),
          role: 'user',
          cartId: cart._id
        };

        const userCreated = await usersModel.create(newUser);
        return done(null, userCreated);
        
      } catch (error) {
        return done(error);
      }
    }
  ));
};

const cookieExtractor = (req) => {
  let token = null;
  if ( req && req.cookies ){
    token = req.cookies['accessToken'];
  }
  return token;
};
