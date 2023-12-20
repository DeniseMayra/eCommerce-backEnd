import passport from 'passport';
import { Router } from 'express';
import { config } from '../config/config.js';
import { authenticate } from '../config/auth.js';
import { UserController } from '../controller/users.controller.js';

const router = Router();


// ---------- LOCAL SESSION ----------
router.post('/signup', passport.authenticate('SignupLocalStrategy',
  {
    session: false,
    failureRedirect:'/api/sessions/fail-signup'
  }),
  UserController.redirectLogin
  );

router.post('/login', passport.authenticate('LoginLocal', 
  {
    session: false,
    failureRedirect:'/api/sessions/fail-login'
  }),
  UserController.login
  );

router.get('/logout', UserController.logout);


router.get('/login', authenticate('jwtAuth') , UserController.getUserResponse);

router.get('/profile', authenticate('jwtAuth'), UserController.getUserResponse);

router.get('/signup', authenticate('jwtAuth') , UserController.getUserResponse);

router.post('/forgot-password', UserController.forgotPassword);

router.post('/reset-password', UserController.resetPassword);

// ---------- SESSION WITH GITHUB ----------
router.get('/signup-github', passport.authenticate('SignupGithub'));

router.get(config.github.callbackUrl, passport.authenticate('SignupGithub', {failureRedirect:'/api/sessions/fail-signup'}),
  UserController.redirectProducts);


// ---------- GENERIC RESPONSE ----------
router.get('/fail-signup', UserController.failSignup);

router.get('/fail-login', UserController.failLogin);

router.get('/fail-auth', UserController.failAuth);

router.get('*', UserController.notFound);

export { router as sessionPassportRouter};
