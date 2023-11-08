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
  if ( req.user ){
    const result = await cartsService.getProductByCartId(req.user.cartId);
    res.render('cart', {data: result.products});
  } else {
    res.redirect('login');
  }
});

router.get('/profile', (req,res) => {
  res.render('profile');
});

router.get('/login', (req,res) => {
    res.render('login');
});

router.get('/signup', (req,res) => {
    res.render('signup');
});


export { router as viewsPassportRouter};
