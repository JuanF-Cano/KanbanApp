import { Router } from "express";

const userRouter = Router();

userRouter.get('/users/:id', (req, res) => {
    const { email, password } = req.body
    res.send("funciona");
});

userRouter.post('/users', (req, res) => {
    const { email, password } = req.body
    res.send("funciona");
});

userRouter.delete('/users/:id', (req, res) => {
    
    res.send("funciona");
});

userRouter.put('/users/:id', (req, res) => {
    const { email, password } = req.body
    res.send("funciona");
});

export default userRouter;