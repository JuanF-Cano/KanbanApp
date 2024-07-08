import { pool } from "../db.js";

export const getSection = async (req,res)=>{
    const id_usuario = req.params.id_users
    try {
        const result= await pool.query('SELECT * FROM sections WHERE id_users= $1 ',[id_usuario])
        res.send(result.rows)
    }catch(e){
        console.log(e)
    }
}

export const createSection = (req,res)=>{
    const { id_users, title} = req.body
    try{
        const result = pool.query('INSERT INTO sections  (id_users, title) VALUES ($1, $2) RETURNING *',[id_users,title])
        res.send(result)
    }catch(e){
        console.log(e)
    }
}

export const deleteSection = async (req,res)=>{
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
}

export const updateSection = async (req, res) => {
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
  }