import { Router } from "express";
import { ensureAuthenticatedInstitution } from "../middlewares/ensureAuthenticatedInstitution";
import { ensureAuthenticatedUser } from "../middlewares/ensureAuthenticateUser";
import { CreateRegistrationController } from "../modules/registrations/services/createRegistration/CreateResgistrationController";
import { ListRegistrationsInEventController } from "../modules/registrations/services/listRegistrationsInEvent/ListRegistrationsInEventController";

const registrationRoutes = Router();

const createResgistrationController = new CreateRegistrationController();
const listRegistrationsInEventController = new ListRegistrationsInEventController();

registrationRoutes.post('/create', ensureAuthenticatedUser, createResgistrationController.create);
registrationRoutes.get('/list/:id', ensureAuthenticatedInstitution, listRegistrationsInEventController.list);

export { registrationRoutes };