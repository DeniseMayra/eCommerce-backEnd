import { Router } from 'express';
import { MessagesController } from '../controller/messages.controller.js';
import { ROLE_USER } from '../clases/constant.js';
import { authenticate, authorize } from '../config/auth.js';

const router = Router();

router.get('/', MessagesController.getMessages);

router.post('/', authenticate('jwtAuth'), authorize(ROLE_USER), MessagesController.newMessage);

router.delete('/:id', MessagesController.delete);

export { router as messageRouter };
