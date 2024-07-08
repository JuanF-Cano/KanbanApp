import { Router } from "express";
import bcrypt from 'bcrypt';
import { SignJWT, jwtVerify } from 'jose';
import { pool } from "../db.js"

const secret = 'aguapanelaconlimon10';
const userRouter = Router();

userRouter.get('/users', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving users');
    }
});

userRouter.post('/users', async (req, res) => {
    const { name, email, password } = req.body;
  
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
            [name, email, hashedPassword]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error creating user');
    }
  });

  userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) return res.status(400).send('Email y contraseña son requeridos');
  
    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = result.rows[0];
        
        if (!user) return res.status(401).send('Email inválido');
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).send('Contraseña inválida');
  
        const encoder = new TextEncoder();
        const id = user.id_users;
        console.log(id)
        const jwtConstructor = new SignJWT({ id });
        const jwt = await jwtConstructor
            .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
            .setIssuedAt()
            .setExpirationTime('1h')
            .sign(encoder.encode(secret));
        
        return res.send({ jwt });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al iniciar sesión');
    }
});

userRouter.get("/login", async (req, res) => {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).send();
  
    try {
      const encoder = new TextEncoder();
      const { payload } = await jwtVerify(authorization, encoder.encode(secret));
      console.log(payload)
      const result = await pool.query('SELECT * FROM users');
      const user = result.find((user) => user.id_users === payload.id_users);
      if (!user) return res.status(401).send();
    
      delete user.password;
    
      return res.send(user);
    } catch(err) {
      return res.status(401).send();
    }
});

/* userRouter.delete('/users/:id', (req, res) => {
    res.send("funciona");
});

userRouter.put('/users/:id', (req, res) => {
    res.send("funciona");
}); */

export default userRouter;