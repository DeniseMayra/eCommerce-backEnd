import passport from 'passport';
import localStrategy from 'passport-local';
import githubStrategy from 'passport-github2';
import { usersModel } from '../dao/mongo/models/users.model.js';
import { createHash, isValidPassword } from '../utils.js';
import { config } from './config.js';

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
        let newUser = req.body;
        newUser.email = username;
        newUser.password = createHash(password);
        const userCreated = await usersModel.create(newUser);
        return done(null, userCreated);

      } catch (error) {
        return done(error);
      }
    }
  ));

  passport.serializeUser((user,done) => {
    done(null, user._id);
  });

  passport.deserializeUser( async (id, done) => {
    const user = await usersModel.findById(id);
    done(null, user); // informacion del usuario desde DB en req.user
  });

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

        const newUser = {
          first_name: profile.displayName,
          last_name: profile.username,
          email: profile._json.email,
          age: null,
          password: createHash(profile.id)
        };

        const userCreated = await usersModel.create(newUser);
        return done(null, userCreated);
        
      } catch (error) {
        return done(error);
      }
    }
  ));
};

