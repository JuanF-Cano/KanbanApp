// Función para validar el formato de email
const validateEmail = (email) => {
    // Expresión regular para validar formato de email básico
    const re = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };
  
  // Middleware de validación personalizado
  const validateUser = (req, res, next) => {
    const { name, email, password } = req.body;
  
  
    // Verificar que name sea una cadena y tenga como máximo 100 caracteres

    if ( !isNaN(name) ||  name.length > 100) {
      return res.status(400).json({ error: 'El nombre debe ser una cadena de texto de máximo 100 caracteres' });
    }
    
    // Verificar que email sea un email válido y tenga como máximo 100 caracteres
    if (!validateEmail(email) || email.length > 100) {
      return res.status(400).json({ error: 'El email debe ser válido y tener máximo 100 caracteres' });
    }
  
    // Verificar que password sea una cadena y tenga como máximo 100 caracteres
    if (typeof password !== 'string' || password.length > 100) {
      return res.status(400).json({ error: 'La contraseña debe ser una cadena de máximo 100 caracteres' });
    }
  
    // Si pasa todas las validaciones, continuar con la ejecución
    next();
  };
  
  export { validateUser };