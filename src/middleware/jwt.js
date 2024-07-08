import { jwtVerify } from "jose";
import dotenv from 'dotenv';

dotenv.config();

  // Middleware de autenticación
const authenticateToken = async (req, res, next) => { 
    const { authorization } = req.headers; // Obtiene el token de autorización de los encabezados de la solicitud

    if (!authorization) return res.status(401).send('Token no proporcionado'); // Si no hay token, responde con un error 401

    try {
        const encoder = new TextEncoder(); // Crea un nuevo TextEncoder
        const { payload } = await jwtVerify(authorization, encoder.encode(process.env.secret)); // Verifica el token y extrae el payload
        req.user = payload; // Asigna el payload del token al objeto req.user
        next(); // Llama al siguiente middleware
    } catch (err) {
        console.error(err); // Imprime el error en la consola
        return res.status(401).send('Token inválido o expirado'); // Responde con un error 401 si el token es inválido o ha expirado
    }
};
  
export { authenticateToken };