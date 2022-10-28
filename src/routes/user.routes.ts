import { Router } from "express";
import { CreateUserCobtroller } from "../modules/users/services/createUser/CreateUserController";


const userRoutes = Router();

const createUserController = new CreateUserCobtroller();

userRoutes.post('/signup', createUserController.signUp);

export { userRoutes }
