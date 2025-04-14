import { Router } from "express";
import * as integrationController from './integration.controller.js';
import { auth } from "../../middlewares/auth.middleware.js";
import { systemRoles } from "../../utils/system-roles.js";

const router = Router();



router.post('/IntegrationApi',auth([systemRoles.USER]),integrationController.IntegrationApi);





export default router;