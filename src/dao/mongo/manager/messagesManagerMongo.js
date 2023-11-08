import { messageModel } from "../models/messages.model.js";

export class MessageManagerMongo {
  constructor() {
    this.model = messageModel;
  }

  newMessage = async(msg) => { 
    try{
      const result = await this.model.create(msg); 
      return result;

    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }

  getAllMessage = async() => {
    try{
      const result = await this.model.find();
      return result;

    } catch (error) {
      throw new Error(error.message);
    }
  }

  deleteMessage = async (id) => {
    try{
      const result = await this.model.findByIdAndDelete(id);
      return result;

    } catch (error){
      if (error.kind === 'ObjectId') {
        throw new Error('Id no encontrado');
      } else {
        throw new Error(error.message);
      }
    }
  }
};
