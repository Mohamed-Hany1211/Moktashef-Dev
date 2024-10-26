// modules imports
import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
// files imports
import {auth} from '../../middlewares/auth.middleware.js';
import * as UserController from './user.controller.js';
import {allowedExtensions} from '../../utils/Allowed-extensions.js';
import {multerMiddleWareHost} from '../../middlewares/multer.middleware.js';
import { systemRoles } from "../../utils/system-roles.js";
const router = Router();
router.post('/signUp',multerMiddleWareHost({extinsions:allowedExtensions.image}).single('img'),expressAsyncHandler(UserController.signUp));
router.get('/verify-email',expressAsyncHandler(UserController.verifyEmail));
router.post('/signIn',expressAsyncHandler(UserController.signIn));
router.get('/getProfile',auth([systemRoles.USER]),expressAsyncHandler(UserController.getProfile));
router.delete('/deleteAccount',auth([systemRoles.USER]),expressAsyncHandler(UserController.deleteAccount));
router.put('/updateUserProfile',auth([systemRoles.USER]),multerMiddleWareHost({extinsions:allowedExtensions.image}).single('newImg'),expressAsyncHandler(UserController.updateUserProfile));
router.patch('/updatePassword',auth([systemRoles.USER]),expressAsyncHandler(UserController.updatePassword));
router.patch('/forgetPassword',expressAsyncHandler(UserController.forgetPassword));
router.patch('/resetPassword',expressAsyncHandler(UserController.resetPassword));
export default router;