import { Router } from "express";
import { getUsers, createUser, login, deleteUser, actualizateUser, getUserById } from "../controllers/User.Controller.js";
import { validateUser } from "../middleware/models.js";
import { authenticateToken } from "../middleware/jwt.js";

const userRouter = Router();

//login
userRouter.post("/login", validateUser, login);

//register
userRouter.post('/user', validateUser, createUser);

//getUser
userRouter.get('/users', getUsers);

//getUserById
userRouter.get('/user/:id', authenticateToken, getUserById)

// Eliminar usuario por ID
userRouter.delete('/user/:id', authenticateToken, deleteUser);

// Actualizar usuario por ID
userRouter.put('/user/:id', validateUser, authenticateToken, actualizateUser);

export default userRouter;