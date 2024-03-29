import { Router } from 'express';
import { ProductsService } from '../services/products.service.js';
import { CartsService } from '../services/carts.service.js';
import { authenticate } from '../config/auth.js';

const router = Router();

router.get('/products', authenticate('jwtAuth'), async(req,res) => {
  const response = await ProductsService.getProductsMongo(req);
  res.render('home', {data: response, user: req.user});
});

router.get('/cart', authenticate('jwtAuth'), async(req,res) => {
  if ( req.user ){
    const result = await CartsService.getById(req.user.cartId);
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

router.get('/admin', (req,res) => {
  res.render('admin');
});

router.get('/forgot-password', (req,res) => {
  res.render('forgotPassView');
});

router.get('/reset-password', (req,res) => {
  const token = req.query.token;
  res.render('resetPassView', {token});
});

export { router as viewsPassportRouter};
