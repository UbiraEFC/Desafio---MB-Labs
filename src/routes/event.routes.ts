import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ListEventsController } from "../modules/events/services/listEvents/ListEventsController";
import { ShowEventController } from "../modules/events/services/showEvent/ShowEventController";

const eventRoutes = Router();

const listEventsController = new ListEventsController();
const showEventController = new ShowEventController();

eventRoutes.get('/list', listEventsController.list);
eventRoutes.get('/:id', ensureAuthenticated, showEventController.showEvent);

export { eventRoutes };
