import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAuthenticatedInstitution } from "../middlewares/ensureAuthenticatedInstitution";
import { CreateEventController } from "../modules/events/useCases/createEvent/CreateEventController";
import { DeleteEventController } from "../modules/events/useCases/deleteEvent/DeleteEventController";
import { ListEventsController } from "../modules/events/useCases/listEvents/ListEventsController";
import { ShowEventController } from "../modules/events/useCases/showEvent/ShowEventController";
import { UpdateEventController } from "../modules/events/useCases/updateEvent/UpdateEventController";

const eventRoutes = Router();

const listEventsController = new ListEventsController();
const showEventController = new ShowEventController();
const createEventController = new CreateEventController();
const deleteEventController = new DeleteEventController();
const updateEventController = new UpdateEventController();

eventRoutes.get('/list', listEventsController.list);
eventRoutes.post('/create', ensureAuthenticatedInstitution, createEventController.create);
eventRoutes.get('/:id', ensureAuthenticated, showEventController.showEvent);
eventRoutes.delete('/delete/:id', ensureAuthenticatedInstitution, deleteEventController.delete);
eventRoutes.put('/update/:id', ensureAuthenticatedInstitution, updateEventController.update);

export { eventRoutes };
