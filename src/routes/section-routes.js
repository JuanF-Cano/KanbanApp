import express from "express";
import { pool } from "../db/db.js";

const sectionRouter = express.Router()


sectionRouter.get("/:id_users",async (req,res)=>{
    const id_usuario = req.params.id_users
    console.log(id_usuario)
    try {
        const result= await pool.query('SELECT * FROM sections WHERE id_users= $1 ',[id_usuario])
        res.send(result.rows)
    }catch(e){
        console.log(e)
    }
}) 


sectionRouter.post("/",(req,res)=>{
    const { id_users, title} = req.body
    try{
        const result = pool.query('INSERT INTO sections  (id_users, title) VALUES ($1, $2) RETURNING *',[id_users,title])
        res.send(result)
    }catch(e){
        console.log(e)
    }
})

sectionRouter.delete("/:id_section", async (req,res)=>{
    const { id_section } = req.params;
    try{
        const result =  await pool.query('DELETE FROM sections WHERE id_section = $1 RETURNING *', [id_section])
        if(result.rowCount > 0){
            res.send(result.rows)
        } else {
            res.status(404).send("Sección no encontrada");
        }
    }catch(e){
        console.log(e)
    }//i, ya no estaba funcionando kasjdklasjdlajsld
})
sectionRouter.put("/:id_section", async (req, res) => {
    const { id_section } = req.params;
    const {  title } = req.body;
  
    try {
      const result = await pool.query(
        'UPDATE sections SET title = $1 WHERE id_section = $2 RETURNING *',
        [ title, id_section]
      );
  
      if (result.rowCount === 0) {
        return res.status(404);
      }
  
      res.send(`se actualizo la ${JSON.stringify(result.rows[0])}`);
    } catch (e) {
      console.error(`no se actualizo ${id_section}:`, e);
      res.status(500).send('Error al actualizar la sección');
    }
  });

export default sectionRouter