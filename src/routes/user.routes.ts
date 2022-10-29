import { Router } from "express";
import { CreateUserController } from "../modules/users/services/createUser/CreateUserController";
import { AuthenticateUserController } from "../modules/users/services/authenticateUser/AuthenticateUserController";
import { ShowUserController } from "../modules/users/services/showUser/ShowUserController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const userRoutes = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const showUserController = new ShowUserController();

userRoutes.post('/signup', createUserController.signUp);
userRoutes.post('/signin', authenticateUserController.signIn);
userRoutes.get('/:id', ensureAuthenticated, showUserController.showUser)

export { userRoutes }
