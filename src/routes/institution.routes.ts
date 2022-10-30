import { Router } from "express";
import { AuthenticateInstitutionController } from "../modules/institutions/services/authenticateInstitution/AuthenticateInstitutionController";
import { CreateInstitutionController } from "../modules/institutions/services/createInstitution/CreateInstitutionController";
import { ShowInstitutionController } from "../modules/institutions/services/showInstitution/ShowInstitutionController";
import { ensureAuthenticatedInstitution } from "../middlewares/ensureAuthenticatedInstitution";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { DeleteInstitutionController } from "../modules/institutions/services/deleteInstitution/DeleteInstitutionController";
import { UpdateInstitutionController } from "../modules/institutions/services/updateInstitution/UpdateInstitutionController";

const institutionRoutes = Router();

const createInstitutionController = new CreateInstitutionController();
const authenticateInstitutionController = new AuthenticateInstitutionController();
const showInstitutionController = new ShowInstitutionController();
const deleteInstitutionController = new DeleteInstitutionController();
const updateInstitutionController = new UpdateInstitutionController();

institutionRoutes.post('/signup', createInstitutionController.signUp);
institutionRoutes.post('/signin', authenticateInstitutionController.signIn);
institutionRoutes.get('/:id', ensureAuthenticated, showInstitutionController.showInstitution);
institutionRoutes.delete('/delete/:id', ensureAuthenticatedInstitution, deleteInstitutionController.delete);
institutionRoutes.put('/update', ensureAuthenticatedInstitution, updateInstitutionController.update);

export { institutionRoutes }
