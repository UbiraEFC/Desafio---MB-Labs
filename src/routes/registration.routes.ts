import { Router } from "express";
import { ensureAuthenticatedInstitution } from "../middlewares/ensureAuthenticatedInstitution";
import { ensureAuthenticatedUser } from "../middlewares/ensureAuthenticateUser";
import { CreateRegistrationController } from "../modules/registrations/useCases/createRegistration/CreateResgistrationController";
import { DeleteRegistrationController } from "../modules/registrations/useCases/deleteRegistration/DeleteRegistrationController";
import { ListRegistrationsInEventController } from "../modules/registrations/useCases/listRegistrationsInEvent/ListRegistrationsInEventController";

const registrationRoutes = Router();

const createResgistrationController = new CreateRegistrationController();
const listRegistrationsInEventController = new ListRegistrationsInEventController();
const deleteRegistrationController = new DeleteRegistrationController();

registrationRoutes.post('/create', ensureAuthenticatedUser, createResgistrationController.create);
registrationRoutes.get('/list/:id', ensureAuthenticatedInstitution, listRegistrationsInEventController.list);
registrationRoutes.delete('/delete/:id', ensureAuthenticatedUser, deleteRegistrationController.delete);

export { registrationRoutes };