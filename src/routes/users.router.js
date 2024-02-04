import {Router} from 'express';
import { authenticate, authorize } from '../config/auth.js';
import { UserController } from '../controller/users.controller.js';
import { ROLE_ADMIN } from '../clases/constant.js';
import { uploaderProfileDocument } from '../utils.js';

const router = Router();

router.get('/', UserController.getUsers);

router.delete('/:uid', authenticate('jwtAuth'), authorize([ROLE_ADMIN]), UserController.delete)

router.delete('/', authenticate('jwtAuth'), authorize([ROLE_ADMIN]), UserController.deleteUsers)

router.put('/premium/:uid', authenticate('jwtAuth'), authorize([ROLE_ADMIN]), UserController.modifyRole);

router.post('/:uid/documents', authenticate('jwtAuth'), uploaderProfileDocument.fields([
  {name: 'identification', maxCount: 1},
  {name: 'address', maxCount: 1},
  {name: 'accountState', maxCount: 1}
]) , UserController.uploadDocument);

export { router as usersRouter };
