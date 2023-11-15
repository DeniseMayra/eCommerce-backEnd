import { MessagesService } from '../services/messages.service.js';

export class MessagesController {

  static getMessages = async (req, res) => {
    try{
      const result = await MessagesService.getMessages(); //array
      res.json({error: false, data: result, message: ''});
      
    } catch (error) {
      res.status(500).json({error: true, data: null, message: error.message});
    }
  };
  
  static newMessage = async(req,res) => {
    try{
      const result = await MessagesService.newMessage(req.body); //object
      res.json({error: false, data: result, message: ''});
  
    } catch (error) {
      res.status(500).json({error: true, data: null, message: error.message});
    }
  };
  
  static delete = async(req,res) => {
    try{
      const result = await MessagesService.delete(req.params.id); 
      res.json({error: false, data: result, message: ''});
  
    } catch (error) {
      res.status(500).json({error: true, data: null, message: error.message});
    }
  };
}
