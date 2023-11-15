import { Router } from 'express';
import { MessagesController } from '../controller/messages.controller.js';

const router = Router();

router.get('/', MessagesController.getMessages);

router.post('/', MessagesController.newMessage);

router.delete('/:id', MessagesController.delete);

export { router as messageRouter };
