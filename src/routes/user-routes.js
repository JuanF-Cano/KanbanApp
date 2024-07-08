import { Router } from "express";
import { pool } from "../db.js"
import bcrypt from 'bcrypt';

const userRouter = Router();

userRouter.get('/users', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users');
        res.status(200).json(result.rows[0]);
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

  userRouter.post('/login', async (req, res) => {
    const { name, password } = req.body;

    try {
        const result = await pool.query('SELECT * FROM users WHERE name = $1', [name]);

        if (result.rows.length > 0) {
            const user = result.rows[0];
            const match = await bcrypt.compare(password, user.password);

            if (match) {
                const payload = { id: user.id, username: user.username };
                const token = jwt.encode(payload, secret);
                res.json({ token });
            } else {
                res.status(401).send('Invalid username or password');
            }
        } else {
            res.status(401).send('Invalid username or password');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error logging in');
    }
});



/* userRouter.delete('/users/:id', (req, res) => {
    res.send("funciona");
});

userRouter.put('/users/:id', (req, res) => {
    res.send("funciona");
}); */

export default userRouter;