import passport from 'passport';
import { Router } from 'express';
import { ERROR } from '../clases/constant.js';
import { config } from '../config/config.js';
import { generateToken } from '../utils.js';
import { authenticate } from '../config/auth.js';

const router = Router();


// ---------- LOCAL SESSION ----------
router.post('/signup', passport.authenticate('SignupLocalStrategy',
  {
    session: false, // si se trabaja con jwt
    failureRedirect:'/api/sessions/fail-signup'
  }),
  async (req,res) => {
  try {
    res.redirect('/login');

  } catch (error) {
    res.status(500).json({stauts: ERROR, payload: null, message: error.message});
  }
});

router.post('/login', passport.authenticate('LoginLocal', 
  {
    session: false,
    failureRedirect:'/api/sessions/fail-login'
  }), 
  async (req,res) => {
    try {
      const token = generateToken(req.user);
      res.cookie('accessToken', token, {httpOnly: true, expiresIn: '24h'}).json({error: false, message: 'login success'});

    } catch (error) {
      res.json({error: true, message: 'Error en el Login'});
    }
});

router.get('/logout', async (req,res) => {
  try {
    res.cookie('accessToken').json({error: false, message: 'logout success'});
    
  } catch (error) {
    res.render('profile', {error: true, message: error.message});
  }
});


router.get('/login', authenticate('jwtAuth') , (req,res) => {
  res.json({error: false, message: 'valido', user: req.user}); 
});

router.get('/profile', authenticate('jwtAuth'), (req,res) => {
  res.json({error: false, message: 'valido', user: req.user}); 
});

router.get('/signup', authenticate('jwtAuth') , (req,res) => {
  res.json({error: false, message: 'valido', user: req.user}); 
});

// ---------- SESSION WITH GITHUB ----------
router.get('/signup-github', passport.authenticate('SignupGithub'));

router.get(config.github.callbackUrl, passport.authenticate('SignupGithub', {failureRedirect:'/api/sessions/fail-signup'}) , (req,res) => {
  res.redirect('/products');
});


// ---------- GENERIC RESPONSE ----------
router.get('/fail-signup', (req,res) => {
  res.render('signup', {error: true, message: 'No se pudo registrar el usuario'});
});

router.get('/fail-login', (req,res) => {
  res.render('login', {error: true, message: 'Error en el login'});
});

router.get('/fail-auth', (req,res) => {
  res.json({error: true, message: 'token invalido'});
});


export { router as sessionPassportRouter};
