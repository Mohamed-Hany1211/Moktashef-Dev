import { Router } from "express";
import * as vulnsController from './vulns.controller.js';

const router = Router();



router.post('/addVuln',vulnsController.addVuln);

router.get('/getVuln',vulnsController.getAllVulns);
router.post('/getAllVulnsWithUsersDummy',vulnsController.getAllVulnsWithUsersDummy);




export default router;