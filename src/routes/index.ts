import { Router } from "express";
import { institutionRoutes } from "./institution.routes";
import { userRoutes } from "./user.routes";

const router = Router();

router.use('/institution', institutionRoutes);
router.use('/users', userRoutes);

export { router } 