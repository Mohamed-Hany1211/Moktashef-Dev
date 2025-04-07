import { Router } from "express";
import * as integrationController from './integration.controller.js';

const router = Router();



router.post('/IntegrationApi',integrationController.IntegrationApi);





export default router;