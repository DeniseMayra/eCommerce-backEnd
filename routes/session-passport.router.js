import passport from 'passport';
import { Router } from 'express';
import { ERROR } from '../clases/constant.js';

const router = Router();

router.post('/signup', passport.authenticate('SignupLocalStrategy', {failureRedirect:'/api/sessions/fail-signup'}), async (req,res) => {
  try {
    res.render('login');

  } catch (error) {
    res.status(500).json({stauts: ERROR, payload: null, message: error.message});
  }
});

router.get('/fail-signup', (req,res) => {
  res.render('signup', {error: true, message: 'No se pudo registrar el usuario'});
});

router.post('/login', passport.authenticate('loginLocal', {failureRedirect:'/api/sessions/fail-login'}), async (req,res) => {
  try {
    res.redirect('/products');
    
  } catch (error) {
    res.render('login', {error: true, message: 'Error en el login'});
  }
});

router.get('/fail-login', (req,res) => {
  res.render('login', {error: true, message: 'Error en el login'});
});

router.get('/logout', async (req,res) => {
  try {
    req.session.destroy(err => {
      if (err) {
        console.log(err);
        res.render('profile', {error: true, message: 'No se puede cerrar session'});
      } else {
        res.redirect('/login');
      }
    });

  } catch (error) {
    res.render('profile', {error: true, message: error.message});
  }
});

export { router as sessionPassportRouter};
