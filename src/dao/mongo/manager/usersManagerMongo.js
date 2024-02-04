import { usersModel } from '../models/users.model.js';
import { SUCCESS, ERROR } from '../../../clases/constant.js';
import { createHash, isValidPassword } from '../../../utils.js';
import { CustomErrorService } from '../../../services/customError.service.js';

export class UsersManagerMongo {
  constructor() {
    this.model = usersModel;
  };

  signupNewUser = async(object) => {
    try {
      object.password = createHash(object.password);
      return await this.model.create(object);
      
    } catch (error) {
      throw new Error(error.message);
    }
  };

  loginUser = async(object) => {
    try {
      const user = await this.model.findOne({email: object.email});

      if ( !user ){
        return {status: ERROR, data: null, message: 'Ususario no registrado'};
      }
      if ( !isValidPassword(object.password, user) ){
        return {status: ERROR, data: null, message: 'Contraseña incorrecta'};
      }

      return { status: SUCCESS,  data: user, message: ''};
      
    } catch {
      throw new Error(error.message);
    }
  };

  findAll = async () => {
    try {
      const result = await this.model.find();
      return result;
      
    } catch (error) {
      throw new Error(error.message);
    }
  }

  findByEmail = async (email) => {
    try {
      const result = await this.model.findOne({email}).lean();
      return result;

    } catch (error) {
      throw new Error(error.message);
    }
  }

  findById = async (id) => {
    try {
      const result = await this.model.findById(id).lean();
      return result;

    } catch (error) {
      throw new Error(error.message);
    }
  }

  createNewUser = async(newUser) => {
    try {
      const result = await this.model.create(newUser);
      return result;
      
    } catch (error) {
      throw new Error(error.message);
    }
  }

  updateUser = async (id, userModify) => {
    try {
      const result = await this.model.findByIdAndUpdate( id, userModify, {new:true});
      return result;

    } catch (error) {
      if (error.kind === 'ObjectId') {
        CustomErrorService.createIdNotFoundError(id);
      } else {
        CustomErrorService.createError({cause: error.reason, message, errorCode: ErrorEnum.DATABSE_ERROR});
      }
    }
  }

  delete = async (id) => {
    try{
      const result = await this.model.findByIdAndDelete(id);
      return result;

    } catch (error){
      if (error.kind === 'ObjectId') {
        CustomErrorService.createIdNotFoundError(id);
      } else {
        CustomErrorService.createError({cause: error.reason, message, errorCode: ErrorEnum.DATABSE_ERROR});
      }
    }
  }
};
