import { Router } from 'express';
import { usersService } from '../dao/mongo/services.js';
import { ERROR } from '../clases/constant.js';

const router = Router();

router.post('/signup', async (req,res) => {
  try {
    const form = req.body;
    const result = await usersService.signupNewUser(form);
    if (result){
      res.render('login');
    } else {
      res.render('signup', {error: true, message: 'No se pudo registrar el usuario'});
    }

  } catch (error) {
    res.status(500).json({stauts: ERROR, payload: null, message: error.message});
  }
});

router.post('/login', async (req,res) => {
  try {
    const form = req.body;

    const result = await usersService.loginUser(form);
    
    if (result.status === ERROR) {
      res.render('login', {error: true, message: result.message});
    } else {
      req.session.email = result.data.email;
      req.session.first_name = result.data.first_name;
      res.redirect('/products');
    }

  } catch (error) {
    res.render('login', {error: true, message: 'Error en el login'});
  }
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
    })

  } catch (error) {
    res.render('profile', {error: true, message: error.message});
  }
});

export { router as sessionRouter};
