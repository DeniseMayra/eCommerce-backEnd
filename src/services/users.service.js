import { usersDAO } from '../dao/dao-manager.js';

export class UserService {

  static findByEmail(email) {
    return usersDAO.findByEmail(email);
  }

  static create(user) {
    return usersDAO.createNewUser(user);
  }

  static update(uid, newUser){ 
    return usersDAO.updateUser(uid, newUser);
  }

  static findById(id){
    return usersDAO.findById(id);
  }
}
