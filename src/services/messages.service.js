import { messagesDAO } from '../dao/dao-manager.js';

export class MessagesService {

  static getMessages() {
    return messagesDAO.getAllMessage();
  }

  static newMessage(message){
    return messagesDAO.newMessage(message);
  }

  static delete(mid){
    return messagesDAO.deleteMessage(mid);
  }
}
