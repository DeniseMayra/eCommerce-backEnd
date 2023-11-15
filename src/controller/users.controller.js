import { generateToken } from '../utils.js';


export class UserController {

  // ---------- LOCAL SESSION ----------
  static redirectLogin = async (req,res) => {
    try {
      res.redirect('/login');
  
    } catch (error) {
      res.status(500).json({error: true, payload: null, message: error.message});
    }
  };

  static login = async (req,res) => {
    try {
      const token = generateToken(req.user);
      res.cookie('accessToken', token, {httpOnly: true, expiresIn: '24h'}).json({error: false, message: 'login success'});

    } catch (error) {
      res.json({error: true, message: 'Error en el Login'});
    }
  };

  static logout = async (req,res) => {
    try {
      res.cookie('accessToken').json({error: false, message: 'logout success'});
      
    } catch (error) {
      res.render('profile', {error: true, message: error.message});
    }
  };


  // ---------- SESSION WITH GITHUB ----------
  static redirectProducts = (req,res) => {
    res.redirect('/products');
  };


  // ---------- GENERIC RESPONSE ----------
  static getUserResponse = (req,res) => {
    res.json({error: false, message: 'valido', user: req.user}); 
  };

  static failSignup = (req,res) => {
    res.render('signup', {error: true, message: 'No se pudo registrar el usuario'});
  };
  
  static failLogin = (req,res) => {
    res.render('login', {error: true, message: 'Error en el login'});
  };
  
  static failAuth = (req,res) => {
    res.json({error: true, message: 'token invalido'});
  };

  static notFound = (req,res) => {
    res.render('notFound');
  };
}
