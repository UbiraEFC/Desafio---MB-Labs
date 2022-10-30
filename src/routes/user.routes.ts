import { Router } from "express";
import { CreateUserController } from "../modules/users/services/createUser/CreateUserController";
import { AuthenticateUserController } from "../modules/users/services/authenticateUser/AuthenticateUserController";
import { ShowUserController } from "../modules/users/services/showUser/ShowUserController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { DeleteUserController } from "../modules/users/services/deleteUser/DeleteUserController";
import { ensureAuthenticatedUser } from "../middlewares/ensureAuthenticateUser";
import { UpdateUserController } from "../modules/users/services/updateUser/UpdateUserController";

const userRoutes = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const showUserController = new ShowUserController();
const deleteUserController = new DeleteUserController();
const updateUserController = new UpdateUserController();

userRoutes.post('/signup', createUserController.signUp);
userRoutes.post('/signin', authenticateUserController.signIn);
userRoutes.get('/:id', ensureAuthenticated, showUserController.showUser);
userRoutes.delete('/delete/:id', ensureAuthenticatedUser, deleteUserController.delete);
userRoutes.put('/update', ensureAuthenticatedUser, updateUserController.update);

export { userRoutes }
