import { Router } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jwt-simple';
import { pool } from "../db.js"
import { marked } from 'marked';


const taskRouter = Router();

taskRouter.get('/task', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tasks');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving users');
    }
});

taskRouter.post('/task', async (req, res) => {
    const { title, body, id_section } = req.body;
    
    // Convertir Markdown a HTML
    const htmlBody = marked(body);
  
    try {
        const result = await pool.query(
            'INSERT INTO tasks (title, body, id_section) VALUES ($1, $2, $3) RETURNING *',
            [title, htmlBody, id_section]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error creating task');
    }
});

taskRouter.put('/task', async (req, res) => {
    const {title, body, id_section} = req.body
    
    // Convertir Markdown a HTML
    const htmlBody = marked(body);

    try {
        const result = await pool.query(
            'UPDATE tasks set title=$1, body=$2, id_section=$3', 
            [title, htmlBody, id_section]
        );
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating task')
    }
});

taskRouter.delete('/task/:id', async (req, res) => {
    const {id} = req.params
    try {
        const result = await pool.query(
          'DELETE FROM tasks WHERE id_task = $1', [id]  
        );
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting task')
    }
});


export default taskRouter;