import { usersModel } from '../models/users.model.js';
import { SUCCESS, ERROR } from '../../../clases/constant.js';

export class UsersManagerMongo {
  constructor() {
    this.model = usersModel;
  };

  signupNewUser = async(object) => {
    try {
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
      if ( user.password !== object.password){
        return {status: ERROR, data: null, message: 'Contraseña incorrecta'};
      }

      return { status: SUCCESS,  data: user, message: ''};
      
    } catch {
      throw new Error(error.message);
    }
  };
}
