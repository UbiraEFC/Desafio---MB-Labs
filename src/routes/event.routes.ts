import { Router } from "express";
import { ListEventsController } from "../modules/events/services/listEvents/ListEventsController";

const eventRoutes = Router();

const listEventsController = new ListEventsController();

eventRoutes.get('/list', listEventsController.list);

export { eventRoutes };
