/**
 * Formatea una fecha proveniente de MySQL (YYYY-MM-DD) 
 * al formato local argentino (DD/MM/YYYY).
 * @param {string|Date} fecha - La fecha en string o Date.
 * @returns {string} - La fecha formateada o un guión si es nula.
 */
export const formatearFecha = (fecha) => {
  // Si no hay fecha, retornar guión
  if (!fecha) return '-';
  
  try {
    // Si ya es un objeto Date válido
    if (fecha instanceof Date && !isNaN(fecha)) {
      return fecha.toLocaleDateString('es-AR');
    }
    
    // Si es un string
    if (typeof fecha === 'string') {
      // Si ya tiene la parte de tiempo, usarlo directamente
      if (fecha.includes('T')) {
        const date = new Date(fecha);
        if (!isNaN(date.getTime())) {
          return date.toLocaleDateString('es-AR');
        }
      }
      
      // Si es solo fecha (YYYY-MM-DD), agregar hora para evitar problemas de zona horaria
      const fechaConHora = `${fecha}T12:00:00`;
      const date = new Date(fechaConHora);
      
      if (!isNaN(date.getTime())) {
        return date.toLocaleDateString('es-AR');
      }
    }
    
    return '-';
  } catch (error) {
    console.error('Error al formatear fecha:', error);
    return '-';
  }
};