import { pool } from "../db.js"; // Importa la conexión a la base de datos desde el archivo db.js

// Exporta la función getTask que obtiene todas las tareas de la base de datos
export const getTask = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tasks'); // Ejecuta una consulta para obtener todas las tareas
        res.status(200).json(result.rows); // Responde con las tareas obtenidas en formato JSON
    } catch (err) {
        console.error(err); // Imprime el error en la consola
        res.status(500).send('Error retrieving users'); // Responde con un error 500 si hay un problema al obtener las tareas
    }
}

// Exporta la función createTask que crea una nueva tarea en la base de datos
export const createTask = async (req, res) => {
    const { title, body, id_section } = req.body; // Obtiene el título, cuerpo y ID de la sección del cuerpo de la solicitud
  
    try {
        const result = await pool.query(
            'INSERT INTO tasks (title, body, id_section) VALUES ($1, $2, $3) RETURNING *', // Inserta la nueva tarea en la base de datos
            [title, body, id_section]
        );
        res.status(201).json(result.rows[0]); // Responde con la tarea creada en formato JSON
    } catch (err) {
        console.error(err); // Imprime el error en la consola
        res.status(500).send('Error creating task'); // Responde con un error 500 si hay un problema al crear la tarea
    }
}

// Exporta la función updateTask que actualiza una tarea existente en la base de datos
export const updateTask = async (req, res) => {
    const { id } = req.params; // Obtiene el ID de la tarea de los parámetros de la solicitud
    const { title, body, id_section } = req.body; // Obtiene el título, cuerpo y ID de la sección del cuerpo de la solicitud
    
    try {
        const result = await pool.query(
            'UPDATE tasks SET title=$1, body=$2, id_section=$3 WHERE id_task=$4 RETURNING *', // Ejecuta una consulta para actualizar la tarea por ID
            [title, body, id_section, id]
        );
        res.status(200).json(result.rows[0]); // Responde con la tarea actualizada en formato JSON
    } catch (err) {
        console.error(err); // Imprime el error en la consola
        res.status(500).send('Error updating task'); // Responde con un error 500 si hay un problema al actualizar la tarea
    }
}

// Exporta la función deleteTask que elimina una tarea de la base de datos
export const deleteTask = async (req, res) => {
    const { id } = req.params; // Obtiene el ID de la tarea de los parámetros de la solicitud
    
    try {
        const result = await pool.query(
            'DELETE FROM tasks WHERE id_task = $1 RETURNING *', // Ejecuta una consulta para eliminar la tarea por ID
            [id]
        );
        res.status(200).json(result.rows[0]); // Responde con la tarea eliminada en formato JSON
    } catch (err) {
        console.error(err); // Imprime el error en la consola
        res.status(500).send('Error deleting task'); // Responde con un error 500 si hay un problema al eliminar la tarea
    }
}
