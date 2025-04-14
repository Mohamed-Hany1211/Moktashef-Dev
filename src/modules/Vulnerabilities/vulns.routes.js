import { Router } from "express";
import * as vulnsController from './vulns.controller.js';
import {auth} from '../../middlewares/auth.middleware.js';
import { systemRoles } from "../../utils/system-roles.js";

const router = Router();



router.post('/addVuln',vulnsController.addVuln);

router.get('/getVuln',vulnsController.getAllVulns);
router.get('/getScanHistoryForSpecificUser',auth([systemRoles.USER]),vulnsController.getScanHistoryForSpecificUser);




export default router;