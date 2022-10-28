import { Router } from "express";
import { CreateUserController } from "../modules/users/services/createUser/CreateUserController";
import { AuthenticateUserController } from "../modules/users/services/authenticateUser/AuthenticateUserController";

const userRoutes = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();

userRoutes.post('/signup', createUserController.signUp);
userRoutes.post('/signin', authenticateUserController.signIn);

export { userRoutes }
