import { Router } from "express";
import * as integrationController from './integration.controller.js';
import { auth } from "../../middlewares/auth.middleware.js";
import { systemRoles } from "../../utils/system-roles.js";
import { validationMiddleware } from "../../middlewares/validation.middleware.js";
import { integrationSchema } from "./integration.validationSchemas.js";
import expressAsyncHandler from "express-async-handler";
const router = Router();



router.post('/IntegrationApi',validationMiddleware(integrationSchema),auth([systemRoles.USER]),expressAsyncHandler(integrationController.IntegrationApi));





export default router;