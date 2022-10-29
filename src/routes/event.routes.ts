import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAuthenticatedInstitution } from "../middlewares/ensureAuthenticatedInstitution";
import { CreateEventController } from "../modules/events/services/createEvent/CreateEventController";
import { DeleteEventController } from "../modules/events/services/deleteEvent/DeleteEventController";
import { ListEventsController } from "../modules/events/services/listEvents/ListEventsController";
import { ShowEventController } from "../modules/events/services/showEvent/ShowEventController";

const eventRoutes = Router();

const listEventsController = new ListEventsController();
const showEventController = new ShowEventController();
const createEventController = new CreateEventController();
const deleteEventController = new DeleteEventController()

eventRoutes.get('/list', listEventsController.list);
eventRoutes.post('/create', ensureAuthenticatedInstitution, createEventController.create);
eventRoutes.get('/:id', ensureAuthenticated, showEventController.showEvent);
eventRoutes.delete('/delete/:id', ensureAuthenticatedInstitution, deleteEventController.delete);

export { eventRoutes };
