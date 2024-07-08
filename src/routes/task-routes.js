import { Router } from "express";
import { getTask, createTask, updateTask, deleteTask } from "../controllers/task-controllers.js";

const taskRouter = Router();

taskRouter.get('/task', getTask);

taskRouter.post('/task', createTask);

taskRouter.put('/task/:id', updateTask);

taskRouter.delete('/task/:id', deleteTask)

export default taskRouter;