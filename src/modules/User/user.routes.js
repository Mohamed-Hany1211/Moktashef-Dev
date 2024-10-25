// modules imports
import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
// files imports
import {auth} from '../../middlewares/auth.middleware.js';
import * as UserController from './user.controller.js';
import {allowedExtensions} from '../../utils/Allowed-extensions.js';
import {multerMiddleWareHost} from '../../middlewares/multer.middleware.js';
const router = Router();

router.post('/signUp',multerMiddleWareHost({extinsions:allowedExtensions.image}).single('img'),expressAsyncHandler(UserController.signUp));
router.get('/verify-email',expressAsyncHandler(UserController.verifyEmail));

export default router;