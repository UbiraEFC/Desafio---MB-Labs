import { Router } from "express";
import { AuthenticateInstitutionController } from "../modules/institutions/services/authenticateInstitution/AuthenticateInstitutionController";
import { CreateInstitutionController } from "../modules/institutions/services/createInstitution/CreateInstitutionController";
import { CreateEventController } from "../modules/events/services/createEvent/CreateEventController";
import { ensureAuthenticatedInstitution } from "../middlewares/ensureAuthenticatedInstitution";

const institutionRoutes = Router();

const createInstitutionController = new CreateInstitutionController();
const authenticateInstitutionController = new AuthenticateInstitutionController();
const createEventController = new CreateEventController();

institutionRoutes.post('/signup', createInstitutionController.signUp);
institutionRoutes.post('/signin', authenticateInstitutionController.signIn);
institutionRoutes.post('/event/create', ensureAuthenticatedInstitution, createEventController.create);

export { institutionRoutes }
