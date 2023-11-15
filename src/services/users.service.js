import { usersDAOmongo } from '../dao/dao-mongo-manager.js';


export class UserService {

  static findByEmail(email) {
    return usersDAOmongo.findByEmail(email);
  }

  static create(user) {
    return usersDAOmongo.createNewUser(user);
  }
}
