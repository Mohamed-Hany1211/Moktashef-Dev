// modules imports
import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
// files imports
import {auth} from '../../middlewares/auth.middleware.js';
import * as UserController from './user.controller.js';
import {allowedExtensions} from '../../utils/Allowed-extensions.js';
import {multerMiddleWareHost} from '../../middlewares/multer.middleware.js';
import { systemRoles } from "../../utils/system-roles.js";
import { validationMiddleware } from "../../middlewares/validation.middleware.js";
import { signUpSchema , signInSchema , UpdateUserProfileSchema ,UpdatePasswordSchema ,forgetPasswordSchema , resetPasswordSchema} from "./user.validationSchemas.js";
const router = Router();
router.post('/signUp',validationMiddleware(signUpSchema),expressAsyncHandler(UserController.signUp));
router.get('/verify-email',expressAsyncHandler(UserController.verifyEmail));
router.post('/signIn',validationMiddleware(signInSchema),expressAsyncHandler(UserController.signIn));
router.get('/getProfile',auth([systemRoles.USER]),expressAsyncHandler(UserController.getProfile));
router.delete('/deleteAccount',auth([systemRoles.USER]),expressAsyncHandler(UserController.deleteAccount));
router.put('/updateUserProfile',validationMiddleware(UpdateUserProfileSchema),auth([systemRoles.USER]),multerMiddleWareHost({extinsions:allowedExtensions.image}).single('newImg'),expressAsyncHandler(UserController.updateUserProfile));
router.patch('/updatePassword',validationMiddleware(UpdatePasswordSchema),auth([systemRoles.USER]),expressAsyncHandler(UserController.updatePassword));
router.patch('/forgetPassword',validationMiddleware(forgetPasswordSchema),expressAsyncHandler(UserController.forgetPassword));
router.patch('/resetPassword',validationMiddleware(resetPasswordSchema),expressAsyncHandler(UserController.resetPassword));
router.post('/uploadImg',auth([systemRoles.USER]),multerMiddleWareHost({extinsions:allowedExtensions.image}).single('img'),expressAsyncHandler(UserController.uploadImg));
router.patch('/updateImg',auth([systemRoles.USER]),multerMiddleWareHost({extinsions:allowedExtensions.image}).single('img'),expressAsyncHandler(UserController.updateImg));
export default router;

