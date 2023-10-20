import { Router } from 'express';
import { messageService } from '../dao/mongo/services.js';
import { ERROR, SUCCESS } from '../clases/constant.js';

const router = Router();

router.get('/', async (req, res) => {
  try{
    const result = await messageService.getAllMessage(); //array
    res.json({status: SUCCESS, data: result, message: ''});
   
  } catch (error) {
    res.status(500).json({stauts: ERROR, data: null, message: error.message});
  }
});

router.post('/', async(req,res) => {
  try{
    const result = await messageService.newMessage(req.body); //object
    res.json({status: SUCCESS, data: result, message: ''});

  } catch (error) {
    res.status(500).json({stauts: ERROR, data: null, message: error.message});
  }
});

router.delete('/:id', async(req,res) => {
  try{
    const result = await messageService.deleteMessage(req.params.id); 
    res.json({status: SUCCESS, data: result, message: ''});

  } catch (error) {
    res.status(500).json({stauts: ERROR, data: null, message: error.message});
  }
});

export { router as messageRouterMongo};
