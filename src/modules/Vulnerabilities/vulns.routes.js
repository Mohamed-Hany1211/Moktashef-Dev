import { Router } from "express";
import * as vulnsController from './vulns.controller.js';
import {auth} from '../../middlewares/auth.middleware.js';
import { systemRoles } from "../../utils/system-roles.js";
import expressAsyncHandler from "express-async-handler";
const router = Router();





router.get('/getAllVulns',expressAsyncHandler(vulnsController.getAllVulns));
router.get('/getScanHistoryForSpecificUser',auth([systemRoles.USER]),expressAsyncHandler(vulnsController.getScanHistoryForSpecificUser));




export default router;