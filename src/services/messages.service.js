import { messageDAOmongo } from '../dao/dao-mongo-manager.js';

export class MessagesService {

  static getMessages() {
    return messageDAOmongo.getAllMessage();
  }

  static newMessage(message){
    return messageDAOmongo.newMessage(message);
  }

  static delete(mid){
    return messageDAOmongo.deleteMessage(mid);
  }
}
