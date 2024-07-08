import { Router } from "express";
import bcrypt from 'bcrypt';
import { SignJWT, jwtVerify } from 'jose';
import { pool } from "../db.js"
import { getUser, createUser, login, getLogin, deleteUser, actualizateUser } from "../controllers/user-controllers.js";


const userRouter = Router();



userRouter.get('/users', getUser);

userRouter.post('/users', createUser);

userRouter.post("/login", login);

userRouter.get("/login", getLogin);

// Eliminar usuario por ID
userRouter.delete('/users/:id', deleteUser);

// Actualizar usuario por ID
userRouter.put('/users/:id', actualizateUser);

export default userRouter;