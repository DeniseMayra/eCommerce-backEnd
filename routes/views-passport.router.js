import { Router } from 'express';
import { cartsService } from '../dao/mongo/services.js';
import { getProductsMongo } from '../clases/router-functions.js';

const router = Router();

router.get('/products', async(req,res) => {
  const response = await getProductsMongo(req);
  const message = req.user?.first_name ? `Bienvenid@ ${req.user.first_name}` : 'Bienvenid@';

  res.render('home', {data: response, welcomeMessage: message});
});

router.get('/cart', async(req,res) => {
  const result = await cartsService.getProductByCartId('651f6661f0f110960f1f1dfb');
  res.render('cart', {data: result.products});
});

router.get('/profile', (req,res) => {
  if( req.user ){
    const welcomeMessage = req.user?.first_name ? `Bienvenid@ ${req.user.first_name}` : 'Bienvenid@';
    res.render('profile', {error: false, data: req.user, message: '', welcomeMessage});
  } else {
    res.render('profile', {error: true, message: 'Debe iniciar sesion'});
  }
});

router.get('/login', (req,res) => {
  if( req.user ){
    res.redirect('profile');
  } else {
    res.render('login');
  }
});

router.get('/signup', (req,res) => {
  if ( req.user ){
    res.redirect('profile');
  } else {
    res.render('signup');
  }
});


export { router as viewsPassportRouter};
