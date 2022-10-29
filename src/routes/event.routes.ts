import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAuthenticatedUser } from "../middlewares/ensureAuthenticateUser";
import { ListEventsController } from "../modules/events/services/listEvents/ListEventsController";
import { ShowEventController } from "../modules/events/services/showEvent/ShowEventController";
import { CreateRegistrationController } from "../modules/registrations/services/createRegistration/createResgistrationController";

const eventRoutes = Router();

const listEventsController = new ListEventsController();
const showEventController = new ShowEventController();
const createResgistrationController = new CreateRegistrationController();

eventRoutes.get('/list', listEventsController.list);
eventRoutes.get('/:id', ensureAuthenticated, showEventController.showEvent);
eventRoutes.post('/registration/create', ensureAuthenticatedUser, createResgistrationController.create);

export { eventRoutes };
