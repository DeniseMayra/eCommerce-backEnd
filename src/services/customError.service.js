import { ErrorEnum } from '../enums/error.enum.js';
import { idNotFound } from './errorCauses.service.js';

export class CustomErrorService {

  static createError = ({name='Error', cause, message, errorCode=1}) => {
    const error = new Error(message, {cause});
    error.name = name;
    error.errorCode = errorCode; 
    throw error;
  }

  static createIdNotFoundError = (id) => {
    const error = new Error( );
    error.name = 'DB Error';
    error.cause = idNotFound(id);
    error.message = idNotFound(id);
    error.errorCode = ErrorEnum.DATABASE_ERROR;
    throw error;
  }
}
