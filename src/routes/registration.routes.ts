import { Router } from "express";
import { ensureAuthenticatedUser } from "../middlewares/ensureAuthenticateUser";
import { CreateRegistrationController } from "../modules/registrations/services/createRegistration/createResgistrationController";

const registrationRoutes = Router();

const createResgistrationController = new CreateRegistrationController();


registrationRoutes.post('/create', ensureAuthenticatedUser, createResgistrationController.create);

export { registrationRoutes };