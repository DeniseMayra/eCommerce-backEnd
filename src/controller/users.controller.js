import { ROLE_PREMIUM, ROLE_USER, USER_STATUS_COMPLETE, USER_STATUS_INCOMPLETE } from '../clases/constant.js';
import { generateEmailToken, sendChangePasswordEmail, sendDeleteUserEmail, verifyEmailToken } from '../helpers/email.js';
import { UserService } from '../services/users.service.js';
import { createHash, generateToken, isValidPassword } from '../utils.js';


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
      req.user.last_connection = new Date();
      await UserService.update(req.user._id, req.user);
      res.cookie('accessToken').json({error: false, message: 'logout success'});
      
    } catch (error) {
      res.render('profile', {error: true, message: error.message});
    }
  };

  static forgotPassword = async (req,res) => {
    try {
      const { userEmail } = req.body;
      const user = await UserService.findByEmail(userEmail);

      if ( !user ){
        res.render('login', {error: true, message: 'Operacion no valida'});
      } else {
        const emailToken = generateEmailToken(userEmail, 5*60); //en segundos
    
        await sendChangePasswordEmail(req, userEmail, emailToken);
        res.send('se envio enlace al correo, <a href="/login">volver a login</a>');
      }

    } catch (error) {
      res.json({error: true, message: error.message});
    }
  }

  static resetPassword = async (req,res) => {
    try {
      const { newPassword } = req.body;
      const { token } = req.query;
      const validEmail = verifyEmailToken(token);
  
      if ( validEmail ){
        const user = await UserService.findByEmail(validEmail);
  
        if ( !user ) res.render('login', {error: true, message: 'Operacion no valida'});
  
        if ( isValidPassword(newPassword, user) ){
          res.render('resetPassView', {error: true, message: 'No se pudo concretar la operacion', token});
        } else {
          const userData = { ...user, password: createHash(newPassword) };
          await UserService.update(user._id, userData);
          res.render('login')
        }
  
      } else {
        res.send('Enlace no valido, <a href="/forgot-password">genere un nuevo enlace</a>');
      }
      
    } catch (error) {
      res.json({error: true, message: error.message});
    }
  }


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


  // ---------- ENDPOINTS ----------
  static getUsers = async (req,res) => {
    try {
      const users = await UserService.findUsers();
      const userMapper = users.map( u => { return { _id: u._id, first_name: u.first_name, email: u.email, role: u.role, last_connection: u.last_connection}});
      res.json({error: false, data: userMapper, message: ''});

    } catch (error) {
      res.status(500).json({error: true, data: null, message: error.message});
    }
  };

  static deleteUsers = async (req,res) => {
    try {
      const days = req.query.days ? parseInt(req.query.days) : 2;
      const dayQty = 1000*60*60*24 * days;
      const expireQty = new Date().getTime() - dayQty;
      const expire = new Date(expireQty)

      let users = await UserService.findUsers();
      users = users.filter(user => {return user.last_connection < expire;});

      users.forEach(async (u) => {
        await UserService.delete(u._id);
        sendDeleteUserEmail(u.first_name, u.email, `Eliminado por inactividad de la cuenta, ultima conexion: ${u.last_connection}`);
      })

      res.json({error: false, data: users, message: ''});

    } catch (error) {
      res.status(500).json({error: true, data: null, message: error.message});
    }
  };

  static delete = async(req,res) => {
    try{
      const result = await UserService.delete(req.params.uid);  //objeto eliminado

      sendDeleteUserEmail(req.user.first_name, req.user.email, 'Un usuario administrador elimino esta cuenta.');

      res.json({error: false, data: result, message: ''});

    } catch (error) {
      res.status(500).json({error: true, data: null, message: error.message});
    }
  };

  static modifyRole = async (req,res) => {
    try {
      const user = await UserService.findById(req.params.uid);
      
      // if ( user.status === USER_STATUS_COMPLETE ){
        if ( user.role === ROLE_PREMIUM ){
          user.role = ROLE_USER;
        } else if ( user.role === ROLE_USER){
          user.role = ROLE_PREMIUM;
        } else {
          res.status(400).json({error: true, data: user, message: 'No se puede cambiar el rol'});
        }
        await UserService.update(user._id, user);
        res.json({error: false, data: user, message: 'Rol del usuario modificado'});
      // }
      // res.status(409).json({error: true, data: null, message: 'Debe cargar todos los documentos correspondientes'});

    } catch (error) {
      res.status(500).json({error: true, data: null, message: error.message});
    }
  };

  static uploadDocument = async (req,res) => {
    try {
      const user = await UserService.findById(req.params.uid);

      const identification = req.files['identification']?.[0] || null;
      const address = req.files['address']?.[0] || null;
      const accountState = req.files['accountState']?.[0] || null;
      const docs = [];
      if ( identification ) {
        docs.push({name: 'identification', reference: identification.filename});
      }
      if ( address ) {
        docs.push({name: 'address', reference: address.filename});
      }
      if ( accountState ) {
        docs.push({name: 'accountState', reference: accountState.filename});
      }

      user.documents = docs;
      if ( docs.length < 3 ){
        user.status = USER_STATUS_INCOMPLETE;
      } else {
        user.status = USER_STATUS_COMPLETE;
      }

      await UserService.update(user._id, user);
      res.json({error: false, data: user, message: 'Update success'});
      
    } catch (error) {
      res.status(500).json({error: true, data: null, message: error.message});
    }
  };
}
