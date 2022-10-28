import { Router } from "express";
import { CreateInstitutionController } from "../modules/institutions/services/createInstitution/CreateInstitutionController";

const institutionRoutes = Router();

const createInstitutionController = new CreateInstitutionController();

institutionRoutes.post('/signup', createInstitutionController.signUp);

export { institutionRoutes }
