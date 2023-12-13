import passport from 'passport';
import { logger } from '../helpers/logger.js';

export const authenticate = (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, 
      {
        session: false,
        failureRedirect: '/api/sessions/fail-auth'
      }, 
      (err, user, info) => {
      if (err) return next(err);
      if (!user) return res.status(401).json({error: true, message: info.toString()});
      logger.info(user);
      req.user = user;
      next();
    }) (req, res, next)
  }
};

export const authorize = (roles) => {
  return async (req,res,next) => {
    if ( !req.user ) return res.status(401).json({error: 'Unauthorized'});

    logger.info(`Solo autorizacion para siguientes roles: ${roles}`)
    if ( !roles.includes(req.user.role) ) {
      logger.warning(`Rol del usuario: ${req.user.role}`);
      return res.status(403).json({error: 'User does not have permissions to access this resource'});
    };
    next();
  }
};
