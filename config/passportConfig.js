import passport from 'passport';
import localStartegy from 'passport-local';
import { usersModel } from '../dao/mongo/models/users.model.js';
import { createHash, isValidPassword } from '../utils.js';

// localStrategy: username y password
export const initializePassport = () => {

  passport.use('SignupLocalStrategy', new localStartegy(
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

  passport.use('loginLocal', new localStartegy(
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
};

