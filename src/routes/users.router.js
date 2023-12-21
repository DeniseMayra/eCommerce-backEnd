import {Router} from 'express';
import { authenticate, authorize } from '../config/auth.js';
import { UserController } from '../controller/users.controller.js';
import { ROLE_ADMIN } from '../clases/constant.js';

const router = Router();

router.put('/premium/:uid', authenticate('jwtAuth'), authorize([ROLE_ADMIN]), UserController.modifyRole)

export { router as usersRouter };
