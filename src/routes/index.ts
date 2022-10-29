import { Router } from "express";
import { institutionRoutes } from "./institution.routes";
import { userRoutes } from "./user.routes";
import { eventRoutes } from "./event.routes";


const router = Router();

router.use('/institution', institutionRoutes);
router.use('/user', userRoutes);
router.use('/event', eventRoutes);

export { router };