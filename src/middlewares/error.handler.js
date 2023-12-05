import { ErrorEnum } from '../enums/error.enum.js';

export const errorHandler = (error, req,res,next) => {
  console.log(error);

  switch ( error.code ){
    case ErrorEnum.DATABASE_ERROR:
      res.json({error:true, title: error.name, message: error.message});
      break;

    case ErrorEnum.INVALID_BODY_JSON:
      res.json({error:true, title: error.name, message: error.message});

      break;

    case ErrorEnum.AUTHENTICATE_ERROR:
      res.json({error:true, title: error.name, message: error.message});

      break;

    case ErrorEnum.AUTHORIZE_ERROR:
      res.json({error:true, title: error.name, message: error.message});

      break;
  }
  next();
}
